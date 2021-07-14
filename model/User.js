const sequelize=require('../db/db');  //for database connection

const Sequelize=require('sequelize'); //definifn constant and datatype from the sequelize package


 module.exports=sequelize.define('users',{
        ID:{
            type:Sequelize.INTEGER,
            autonIncrement:true,
            primaryKey: true,
            autoIncrement:true
        },
        Name:{
            type:Sequelize.STRING,
            unique:true
        },
        Email:{
           type:Sequelize.STRING
        },
        Password:{
            type:Sequelize.STRING
        },
        Role: {
            type: Sequelize.ENUM,
            values:['User','Manager','Admin']
        },
        AccessToken:{
        type:Sequelize.TEXT
        },
         CreatedAt:{
            type:Sequelize.DATE,
            allowNull:false,
            defaultValue:Sequelize.NOW
        }, 
      },{
        timestamps:false
    });

