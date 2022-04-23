const dbConfig=require('../config/dbConfig');
const {Sequelize,DataTypes}=require('sequelize');
const sequelize=new Sequelize(
dbConfig.DB,
dbConfig.USER,
dbConfig.PASSWORD,
{
host : dbConfig.HOST,
dialect:dbConfig.dialect,
operatorsAliases:false, //optional
pool:{
    max:dbConfig.pool.max,
    max:dbConfig.pool.min,
    max:dbConfig.pool.acquire,
    idle:dbConfig.pool.idle
    }
}

)
sequelize.authenticate()
.then(()=>{
    console.log('connected.....')
})
.catch(err =>{
    console.log('Error',err)
})
const db={}
db.Sequalize=Sequelize
db.sequelize=sequelize
db.products=require('./productModel.js')(sequelize,DataTypes)
db.sequelize.sync({force:false})//see on net
.then(()=>{
    console.log('yes re-sync')
})

module.exports=db