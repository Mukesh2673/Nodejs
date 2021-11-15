const express=require("express")
const app=express()
const bcrypt=require('bcrypt');
var cors=require('cors');
app.use(cors());
db=require('./db');
sm=require('./sendmail');
var Objectid = require('mongodb').ObjectID;
const { ObjectID } = require("bson");
var router=express.Router();
/* router.get('/getapi',(req,res)=>{
    res.send("user get api");
})
router.post('/ins',(req,res)=>{
    db.insertuser(req.body);
    console.log("email: "+req);
    res.json({"status":"inserted successfull"});
})
 */
router.post('/signup',async(req,res)=>{
//console.log(req.body.name);
const salt=await bcrypt.genSalt(10);
const bpass=await bcrypt.hash(req.body.password,salt);
var patientdata={
    name:req.body.name,
    email:req.body.email,
    password:bpass,
    phone:req.body.phone,
    username:req.body.username
}
db.insertuser(patientdata);
res.send(patientdata);

})

router.post('/signin',(req,res)=>{
    var loginobj={
        username:req.body.username
    };



db.user_signin(loginobj,req.body.password,res);
});


/* ----------------------------insert Available slot------------------- */
router.post('/availableslot',async(req,res)=>{

    var starttime=req.body.start;
    var endtime=req.body.end;
    var slot=req.body.slot;
    var date=req.body.date;

  starttimehours=parseInt(starttime.slice(0,2));
 
 starttimeminute=parseInt(starttime.slice(3,5));
 
 sm=starttimehours*60+starttimeminute
 
 
 endtimehours=parseInt(endtime.slice(0,2));
 
 endtimeminute=parseInt(endtime.slice(3,5));
 em=endtimehours*60+endtimeminute
 
 totalminutes=em-sm

 
 loop=Math.trunc(totalminutes/slot)
 a=[];
 if(starttimehours<10)
 {
   var st='0'+starttimehours
 }
 else{
    st=starttimehours
 }
 if(starttimeminute==0)
 {
    var sm='0'+starttimeminute
 }
 else{
     sm=starttimeminute;
 }
 
 var b=date+"T"+st+':'+sm+':00'



 a.push(b);
 for(var i=1;i<=loop;i++)
 {
   
  var m1=starttimeminute+i*slot;
 m1=m1%60;
 slot=parseInt(slot);
 
 
 
 
 if(m1==0)
 {
     m1='00'
     starttimehours=starttimehours+1;
 }
 else if(m1<10)
 {
     m1='0'+m1
 } 

 if(starttimehours<10)
 {
     h="0"+starttimehours;
 }
 else{
     h=starttimehours;
 }




var k=date+"T"+h+':'+m1+':00'

a.push(k);
 

 if(m1+slot>59)
 {
 starttimehours=starttimehours+1;
 }

 }
 for(var i=0;i<=a.length-2;i++)
 {
    var slot = {
      
        color:"green",
          start: a[i],
          end:a[i+1],
          title: "available",
          allDay:false
      };
 
db.insertslot(slot,res)
 
}
db.allslot(res);
})
     
     
     
     
     
     
     

    
/* ----------------------------get All slot------------------- */
router.get('/allslot',(req,res)=>{


db.allslot(res);
})
/* ----------------------------get Available slot------------------- */
router.get('/availableslot',(req,res)=>{


    db.availableslot(res);
})
/* ----------------------------get booked slot------------------- */
router.get('/bookedslot',(req,res)=>{


    db.bookedslot(res);
})








/* -------------------------------------delete Available slot------------------ */
router.delete('/deleteslot',(req,res)=>{
var id=req.body._id
slotid={"_id": Objectid(id)}
db.deleteslot(slotid,res);
})

/* ----------------------------------------------Book Data--------------------------- */
router.patch('/bookslot',(req,res)=>{
id= ObjectID(req.body.data.id._id)
bookid=id
uid=ObjectID(req.body.data.uid)
userdetails={"uid":uid}
pemail=(req.body.data.email);
let starttime=new Date(req.body.data.start)
 starttime=starttime.toString()
let endtime=new Date(req.body.data.end)
 endtime=endtime.toString()


db.bookslot(bookid,userdetails,res);
sm.sendEmail(pemail,starttime,endtime);
 })






module.exports=router;
