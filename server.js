const express = require('express')
const cors=require('cors')
const app = express()
var corOption={
    origin:"https://localhost:8081"
}



//middleware
app.use(cors(corOption))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//router
const router=require('./routes/ProductRouter')
app.use('/api/products',router)


//testingapi
app.get('/',(req,res)=>{
    res.json({message:'hello from api'})
})

//port
const PORT=process.env.PORT || 8080

//server
app.listen(PORT,()=>{
    console.log(`server is running port ${PORT}`)
})