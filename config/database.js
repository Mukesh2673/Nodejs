const express=require("express");
var bodyParser=require('body-parser');
const mongoose=require("mongoose");
//var cors=require('core');
var app=express();
//nodapp.use(cors())
const port=1100
mongoose.connect('mongodb://localhost:27017/jwt',
  
).then(()=>console.log("connection Successfull......."))
.catch((err)=>console.log(err));

//schema
