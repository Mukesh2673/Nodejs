const router=require("express").Router();
const jwt=require("jsonwebtoken");
router.post('/signup',(req,res)=>{
const {username,password}=req.body
console.log(username,password);
const token=jwt.sign({
    username
}, "faldkjflasdjflasjfjalsjjldsfksxl",{
    expiresIn:3600000
})
res.json({token});
})



module.exports=router