
module.exports=(sequelize,DataTypes)=>{
    const users=sequelize.define("user",{
        name:DataTypes.STRING,
        email:{
            type:DataTypes.STRING,
            defaultValue:'test@gmail.com'
            },
            gender:{
                type:DataTypes.STRING
            }
        }
        
        );
        return users
}
        /* ,{tmestamps:false}  if we will write so then it will not create a column created and updatedat*/
            //updatedat:false to remove only udatedat
            //timestamp:false
            //createdAt:'created_at'
            //updateAt:'modified_at'
            //tableName:'userdata' it will create a new table if table not exists otherwise it will drop that table

