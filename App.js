const express =require("express")
let mongoose = require("mongoose")
let userRouter=require("./Routes/user-routes")
let blogRouter=require("./Routes/blog-router")
let app =express();
var PORT=5000;
var cors = require("cors");

app.use(cors());
app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/blog",blogRouter)
mongoose.connect("mongodb+srv://devajith:MJC8tjq167Pktqwk@cluster0.jzonz9t.mongodb.net/?retryWrites=true&w=majority").then(()=>
{
    console.log("mongo connected")
}).catch((err)=>
{
    console.log(`connection error ${err}`)
})


app.get("/",((req,res)=>
{
    res.send("hai")
}))







app.listen(PORT,(err)=>
{
    if(err)
    {
        console.log(err)

    }
    else{
        console.log(`server connected to ${PORT}`)
    }
})