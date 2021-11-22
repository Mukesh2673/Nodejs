var MongoClient = require('mongodb').MongoClient
var bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

MongoClient.connect('mongodb://localhost:27017/patients', function (err, client) {
  if (err) throw err

  var db = client.db('patients1')

exports.createcol=function(){
  console.log("connected");
}







/* ---------------------------------signin slot-------------------------- */

exports.user_signin=function(uobj,pass,outp){
db.collection("patients").find(uobj).toArray(function(err,result){
if(err){
  throw err;
}
else{
   if(result.length>0){
    bcrypt.compare(pass,result[0].password,function(err,result2){
      if(result2==true){
      
       // outp.json({result});
        //outp.json({"msg":"Login Successfull"});
        //outp.setHeader('Content-Type', 'application/json');
        //outp.send("result",result);

        const token=jwt.sign({
          result
      }, "helloMyNameisMukeshBhatt",{
          
      });

      outp.json({token});

      }
      else{
    
          outp.json(1);
      }



    });
}
  else{
 /*    outp.json({"msg":"USER NOT FOUND"}); */
      outp.json(2);
} 
}


});




}









});