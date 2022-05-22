const express= require('express');
const app=express();
require('./models/index');
var userCtrl=require('./controllers/userController')
const port=8080
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.get("/add",userCtrl.addUser);
app.get("/crud",userCtrl.crudOperation)
app.get("/query",userCtrl.queryData)
app.get("/finder",userCtrl.finderData)
app.get("/raw-query",userCtrl.rawQuery)
app.listen(port,()=>{
    console.log(`App is running at http://localhost:${port}`);
})
