const {Sequelize,DataTypes}=require('sequelize');
const sequelize=new Sequelize('sequelizecourse','root','',{
host:'localhost',
dialect:'mysql',
logging:false,//to hide all sql query display in console
pool:{max:5,min:0,idle:10000}
});
sequelize.authenticate()
.then(()=>{
    console.log("connected");
})
.catch(err=>{
    console.log("Error"+err)
})
const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.users=require('./users')(sequelize,DataTypes);
db.sequelize.sync(
    //{force:true} it will drop table and create again new table
    )
.then(()=>{
    console.log('yes re sync');
})
db.users=require('./users')(sequelize,DataTypes);
module.exports=db;