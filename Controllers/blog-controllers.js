
let Blog=require("../Modals/Blog");
const User = require("../Modals/User");
var mongoose =require("mongoose")


module.exports={


    getAllBlogs: async function(req,res,next)
    {
       let blogs;
       try {

        blogs=await Blog.find().populate("user")
        
       } catch (error) {
         console.log(error)
       }
       if(blogs)
       {
        return res.status(200).json({blogs})
       }
       else{
        return res.status(404).json({message:"no blogs are there"})
       }

    },
    addBlog: async function(req,res,next)
    {
        const{title,description,image,user}=req.body
        let existingUser; 
        try {
          existingUser= await User.findById(user)
        } catch (error) {
            console.log(error)
        }
        if(!existingUser)
        {
            res.status(404).json({message:"Unable to find user"})
        }
        const blog= new Blog(
            {
                title,
                description,
                image,
                user
            }
        )
        
        try {

           const session= await mongoose.startSession()
           session.startTransaction()
           await blog.save({session})
           existingUser.blogs.push(blog);
           await existingUser.save({session});
           await session.commitTransaction()
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"something wrong"})
        }
        if(blog)
        {
           return res.status(200).json({blog})
        }
        else
        {
          return res.status(400).json({message:"error in creating blog"})
        }
    },
    updateBlog: async function(req,res,next)
    {
        const{title,description}=req.body
        let blog;
        let blogId= req.params.id
        try {
            
           blog= await Blog.findOneAndUpdate(blogId,{
                title:title,
                description:description
            })

            
            
        } catch (error) {
            console.log(error)
        }
        if(!blogId)
        {
            return res.status(500).json({message:"error in update"})
        }
        else
        {
            return res.status(200).json({blog})  //onlt gives not updated blog but blog is actually updated
        }

    },
    getBlogById: async function(req,res,next)
    {
        let blogId=req.params.id;
        let blog
        try {
            blog=await Blog.findById(blogId)
        } catch (error) {
            console.log(error)
        }
        if(!blog)
        {
            return res.status(404).json({message:"no blog"})
        }
        else
        {
            return res.status(200).json({blog})
        }
    },
    deleteBlog: async function(req,res,next)
    {
        let blogId=req.params.id;
        let deletedBlog
        try {
          deletedBlog=  await Blog.findByIdAndRemove(blogId).populate("user")
          await deletedBlog.user.blogs.pull(deletedBlog)
          await deletedBlog.user.save()
        } catch (error) {
            console.log(error)
        }
        if(!deletedBlog)
        {
            return res.status(404).json({message:"failed to delete"})
        }
        else{

            return res.status(200).json({deletedBlog})
        }
    },
    getBlogsOfUser: async function(req,res,next)
    {
        let userId=req.params.id;
        
        let userBlogs;
        try {
            userBlogs=await User.findById(userId).populate("blogs")
            
            
        } catch (error) {
            console.log(error)
        }
        if(!userBlogs)
        {
           return res.status(404).json({message:"no user"})
        }
        else
        {
            return res.status(200).json(userBlogs)
        }
    }

}