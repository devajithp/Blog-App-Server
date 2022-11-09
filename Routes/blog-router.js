let express= require("express")
let router=express.Router();
let blogController= require("../Controllers/blog-controllers")


router.get("/",blogController.getAllBlogs) // http://localhost:5000/api/blog

router.post("/addblog",blogController.addBlog)

router.put("/update/:id",blogController.updateBlog)

router.get("/:id",blogController.getBlogById)

router.delete("/delete/:id",blogController.deleteBlog)

router.get("/userblog/:id",blogController.getBlogsOfUser)

router.get("/blogbyid/:id",blogController.getBlogById)






module.exports=router;