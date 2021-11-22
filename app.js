const express = require('express');
const app = express();
var bodyParser=require('body-parser')
var cors=require('cors');
app.use(cors())

const user_r=require('./router');



app.use(express.json())


app.use("/user",user_r);
const port=5001
app.listen(port, () => {

});

