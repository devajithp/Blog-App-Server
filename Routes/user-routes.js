let express=require("express")
let userController=require("../Controllers/user-controllers")

let router=express.Router();


router.get("/",userController.getAllUsers)  // http://localhost:5000/api/user

router.post("/signup",userController.userSignup)

router.post("/login",userController.userLogin)





module.exports=router;