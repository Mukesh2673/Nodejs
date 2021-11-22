const express=require("express")
const  cors=require('cors');
const app=express()
const JWT=require("jsonwebtoken");
const checkAuth=require("./middleware/checkAuth");

app.use(cors());
const bcrypt=require('bcrypt');

db=require('./db');

var router=express.Router();

var Objectid = require('mongodb').ObjectID;
const { ObjectID } = require("bson");

router.post('/signin',(req,res)=>{
    var loginobj={
        username:req.body.username
        
    };
db.user_signin(loginobj,req.body.password,res);
});


router.get('/details',checkAuth,(req,res)=>{
  
    const token=req.header('x-auth-token');
    let user= JWT.verify(token,"helloMyNameisMukeshBhatt")
    res.send(user.result[0]);
})




module.exports=router;
