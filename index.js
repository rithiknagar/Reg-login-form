require('dotenv').config();

const path=require("path");

const express=require("express");

const userRoute=require("./routes/user.js");
const connecttomongodb=require("./connection.js")

const cookieparser=require("cookie-parser")
const {checkforauthentication}=require("./middlewares/authentication.js")

const mongoose=require("mongoose");
const app=express();
const PORT=process.env.PORT||8001;


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkforauthentication("token"));
app.use(express.static(path.resolve("./public")));

connecttomongodb(process.env.MONGO_URI)
.then(()=>console.log("mongoDB connected succesfully"))

app.get("/",async(req,res)=>{ 

    res.render("home",{user:req.user});
})

app.use("/",userRoute)

app.listen(PORT,()=>console.log(`server started at PORT:${PORT}`));