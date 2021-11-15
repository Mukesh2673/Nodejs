const express=require("express")
const app=express()

var router=express.Router();
router.get('/getapi',(req,res)=>{
    res.send("Category get api");
})
router.get('/ins',(req,res)=>{
    res.send("Category insert api");
})

module.exports=router;
