const { response } = require('express');
const { users, Sequelize } = require('../models');
var db = require('../models')
const {Op,QueryTypes}=require('sequelize');
const User = db.users;
var addUser = async (req, res) => {
    //1  let data=await User.create({name:'demo',email:'mks1234@gmail.com'});   
    //or
    //2
    let data = User.build({ name: 'Test', email: 'add@gmail.com' });
    // update ///
    /*  data.name='dummy';
     data.save(); */

    //delete
    //data.destory();
data.save();
    let response = {
        data: 'okdata'
    }
    res.status(200).json(response);
}
var crudOperation=async(req,res)=>{
 //insert
//let data=await User.create({name:'crud',email:'crud1234@gmail.com'});   
 

//update      
 /* let data=await User.update({name:'Update'},{
     where:{
         id:2
     }
 }) */

 
 //delete
 /* let data=await User.destroy({
    where:{
        id:2
    }
}) */
 

//truncate Delete all table
/*  let data=await User.destroy({
    truncate:true
 })
 */


 //bulk insert
/* let data=await users.bulkCreate([
{name:'first',email:'first@gmail.com',gender:'male'},
{name:'first',email:'first@gmail.com',gender:'male'},
{name:'first',email:'first@gmail.com',gender:'male'}
]) */



//find
let data=await User.findAll({});
let response={
    data:data
}
res.status(200).json(response)
}


var queryData=async(req,res)=>{
/* let data=await User.create({name:'mkesh',email:'abc123@gmail.com',gender:'male'},{
    fields:['email'] //condition suppose we want insert only email
}) */

//select
/* let data=await User.findAll({});
    let response ={
    data:data
} */

//get single
/* let data=await User.findOne({});
    let response ={
    data:data
} */

//get perticular data
 /* let data=await users.findAll({
    attributes:[
        'name',
        'email'
    ]
 }) */

//change attribut email
 /* let data=await users.findAll({
    attributes:[
        'name',
        ['email','emailId']
    ]
 }) */

 //count number of entries
/*  let data=await users.findAll({
    attributes:[
        'name',
        'email',
        [Sequelize.fn('Count',Sequelize.col('email')),'emailCount']  ]
 }) */

//ConCat

 /* let data=await users.findAll({
    attributes:[
        'name',
        'email',
        [Sequelize.fn('CONCAT',Sequelize.col('email'),'ID'),'emailCount']  ]
 }) */


//include-exclude
/* let data=await users.findAll({
    attributes:{
        exclude:['createdAt','updatedAt'],
    
    include:[
        [Sequelize.fn('CONCAT',Sequelize.col('name'),'bhatt'),'FullName']
    ]
},
     })
 */

//----------------condition ---------------//
//for to get count directly
//let data=await User.count({})
let data=await User.findAll({
 where:{
    id:{
        [Op.eq]:1  //meaning operator equal to there are many operator
    }},
    
/*     email:{
        [Op.email]:'first@gmail.com'
    }  */

    email:{
        [Op.like]:"%@gmail.com%" //all the value that have last value @gmail.com
    },
    order:[
        ['name','DESC']
    ],
    group:['email','name'],
    limit:2,
    offset:1

});

 let response ={
    data:data
}






res.status(200).json(response);
}

var finderData=async(req,res)=>{
//let data=await User.findByPk(1);//get data by primary key
/* let data=await User.findAndCountAll({
    where:{
        email:"first@gmail.com"
    }
}) it will give data related to condition with Count */    




/*
it will find the data with given conditon satisfied other wise create a new dataset(new entry)

let [data,created]=await users.findOrCreate({
    where:{name:'dummy'},
    default:{
        email:'dummy@gmail.com',
        gender:'male0'
    }
});
let response ={
        data:data,
        add:created
    }
    res.status(200).json(response);

} */
}
var rawQuery=async(req,resp)=>{
    const users=await db.Sequelize.query("Select * from users where gender=:gender",{
        type:QueryTypes.SELECT,
        //model:Users,
        //mapToModel:true,
        //raw:true
        replacements :{gender:'male'},//gender=:gender
        replacements :['male'] //gender=?
    });
    let response={
        data:'Raw Query',record:users
    }
    resp.status(200).json(response);
}


module.exports = {
    addUser,
    crudOperation,
    queryData,
    finderData,
    rawQuery
}