const express=require("express")
const app=express()
const moment=require('moment');
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
    var a=[];
    function getTimeStops(start, end){
        var startTime = moment(start, 'HH:mm');
        var endTime = moment(end, 'HH:mm');
        
        if( endTime.isBefore(startTime) ){
          endTime.add(1, 'day');
        }
      
      
      
        while(startTime <= endTime){
          a.push(new moment(startTime).format('HH:mm'));
          startTime.add(slot, 'minutes');
          
        }
        
      }
      getTimeStops(starttime, endtime);
   
k=[];

 for(var i=0;i<=a.length;i++)
 {
    st=date+'T'+a[i]+':00'
    k.push(st); 

  }
 for(var i=0;i<k.length-2; i++) {
     var slot = {
      
        color:"green",
          start: k[i],
          end:k[i+1],
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
