const router=require("express").Router();
const jwt=require("jsonwebtoken");
router.post('/login',(req,res)=>{
const {username,password}=req.body
console.log(username,password);
const token=jwt.sign({
    username
}, "helloMyNameisMukeshBhatt",{
    
})
res.json({token});
})
module.exports=router