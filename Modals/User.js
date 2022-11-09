let mongoose =require("mongoose")

let userSchema= new mongoose.Schema
(
   {
      name:{
        type: String,
        required: true,

      },
      email:{
        type:String,
        require: true,
        unique:true
      },
      password:{
        type:String,
        required:true,
        minlength:4
      },
      blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"Blog",
        required:true
      }]


   }

)

module.exports= mongoose.model("User",userSchema,"users")
