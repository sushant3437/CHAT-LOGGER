// to initialise the database
const mongoose=require("mongoose");

const Chat = require("./models/chat.js");
require('dotenv').config()


const dbUrl = process.env.ATLAS_DB_URL;
async function main() {
    //await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    await mongoose.connect(dbUrl);
}
main().then(()=>{
    console.log("connnection successfull");
})
.catch(()=>{
    consolee.log("error");
})

let allChats=[
    {
        from:"sushant",
        to:"omkar",
        msg:"send notes",
        created_at:new Date(),  
    },
    {
        from:"nikhil",
        to:"nitin",
        msg:"dont study more",
        created_at:new Date(),
    },
   {
    from:"jons",
    to:"criss",
    msg:"send money",
    created_at:new Date(),
   },
   {
    from:"viv",
    to:"harry",
    msg:"hello man",
    created_at:new Date(),
   },
];

Chat.insertMany(allChats);