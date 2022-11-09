let User =require("../Modals/User")
let bcrypt =require("bcryptjs")

module.exports={
    getAllUsers: async function(req,res,next)
    {
        let users;
    
        try {
    
          users=  await User.find()
            
        } catch (error) {
            console.log(error)
        }
        if(!users)
        {
            return res.status(404).json({message: "no users"})
        }
        return res.status(200).json({users})
    },
    userSignup: async function (req,res,next)
    {
        
        const{name,email,password}=req.body

        

        let user;
        try {

         user= await User.findOne({email})
          
        } catch (error) {
            console.log(error)
        }
        if(!user)
        {
            
            try {
                let hashedPassword=  bcrypt.hashSync(password)
                user= await User.create({
                    name:name,
                    email:email,
                    password:hashedPassword,
                    blogs:[]
                  })
     
                
            } catch (error) {
                console.log(error)
            }
          
            return res.status(201).json({user})

        }
        else
        {
            console.log("user exists")
            res.status(400).json({message:"user exists"})
        }
    },
    userLogin: async function(req,res,next)
    {
        const{email,password}=req.body

        let user
        try {
            user=await User.findOne({email})

        } catch (error) {
            console.log(error)
        }
        if(user)
        {
            let status=await bcrypt.compare(password,user.password)
            if(status)
            {
               return res.status(201).json(user)
            }
            else
            {
               return res.status(400).json({message:"Incorrect password"})
            }
        }
        else
        {
             return res.status(400).json({message:"incorrect Email"})
        }
    }
}

 