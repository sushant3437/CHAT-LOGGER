require('dotenv').config()

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");

const Chat = require("./models/chat.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true})); //to parse the data
app.use(methodOverride("_method"));

const dbUrl = process.env.ATLAS_DB_URL;

async function main() {
    //await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    await mongoose.connect(dbUrl);
}
main().then(()=>{
    console.log("connnection successfull");
})
.catch(()=>{
    console.log("error");
})

//index route
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();   //it will return the data from the database
    // console.log(chats);
    res.render("index.ejs",{chats});
})

//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})

//create route
app.post("/chats",(req,res)=>{
    let{from,to,msg}=req.body;   //to access the data of form in new.ejs
   let newChat=new Chat({
  from:from,
  to:to,
  msg:msg,
  created_at:new Date(),
   });
   //to save the chat
   newChat.save().then((res)=>{
    console.log("chat was saved");
   }).catch((err)=>{
    console.log(err);
   });
   res.redirect("/chats");
})

//edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//update route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let{msg:newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {runvalidators:true,new:true},
    );
    res.redirect("/chats");
})

//Delete route
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    // console.log(deletedChat);
    res.redirect("/chats");
})
app.get("/",(req,res)=>{
    res.redirect("/chats");
})
app.listen(8080,()=>{
    console.log("app is listening");
});