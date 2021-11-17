const express=require("express")
var bodyParser=require('body-parser')
var cors=require('cors');
var app=express()
const moment= require('moment'); 
app.use(cors())
const port=1100
var db=require('./db');
var user_r=require('./router');
//var Category_r=require('./cat-router');
//var doctor=require('./router');


app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json())



app.get('/',(req,res)=>{
res.send("Welcome to express")
});
app.listen(port,()=>{
    console.log("port",+port);
});
app.get('/mongocol',(req,res)=>{
 db.createcol();
 res.send("db created")
})
app.get('/ins',(req,res)=>{
db.insertuser();
res.send("inserted");
})
app.use("/user",user_r);

