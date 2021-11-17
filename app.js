const express=require("express");
var bodyParser=require('body-parser');
const mongoose=require("mongoose");
//var cors=require('core');
var app=express();
//nodapp.use(cors())
const port=1100
mongoose.connect('mongodb://localhost:27017/mongooselearn',
  
).then(()=>console.log("connection Successfull......."))
.catch((err)=>console.log(err));

//schema
const user= new mongoose.Schema({
name:{
    type:String,
    required:true
},
ctype:String,
video:Number,
author:String,
active:Boolean,
date:{
    type:Date,
    default:Date.now
}
})
//create collection using mondel is is class so write in capital letter
const Userdetails=new mongoose.model("userschema",user);
//create document or insert
/* const Insertdata1=new Userdetails({
    name:"mukesh",
    ctype:"bhatt",
    author:"mukeshbhatt",
    active:true
    })
Insertdata1.save();
 */


//insert multiple document
/* const Insertdata1=new Userdetails({
    name:"mukesh",
    ctype:"bhatt",
    author:"mukeshbhatt",
    active:true
    })
    const Insertdata2=new Userdetails({
        name:"mukesh1",
        ctype:"bhatt1",
        author:"mukeshbhatt1",
        active:true
        })
        const Insertdata3=new Userdetails({
            name:"mukesh2",
            ctype:"bhatt2",
            author:"mukeshbhatt2",
            active:true
            })
            const Insertdata4=new Userdetails({
                name:"mukesh3",
                ctype:"bhatt3",
                author:"mukeshbhatt3",
                active:true
                })
                Userdetails.insertMany([Insertdata1,Insertdata2,Insertdata3,Insertdata4]);
 */


//delete the docuement

const deleteDocument=async (_id)=>{
    try{
        const result=await Userdetails.deleteOne({_id});
        //const result=await Userdetails.findByIdAndDelete({_id});
        //console.log(result);
    }
    catch(err){
        console.log(err);
    }
  
}
//deleteDocument("6194ea6754819d2bcb691f81");

//update Document
const updateDocument=async(_id)=>{
   try{ const result=await Userdetails.findByIdAndUpdate({_id},{
        $set:{
            name:"Mohit"
        }

    });
    console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
 
//updateDocument("6194ea6754819d2bcb691f7e");


app.listen(port,()=>{
    console.log("port",+port);
});


