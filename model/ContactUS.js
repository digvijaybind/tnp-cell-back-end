const sequelize=require('../db/db');  //for database connection

const Sequelize=require('sequelize'); //definifn constant and datatype from the sequelize package


 module.exports=sequelize.define('contactus',{
        ID:{
            type:Sequelize.INTEGER,
            autonIncrement:true,
            primaryKey: true,
            autoIncrement:true
        },
        FirstName:{
            type:Sequelize.STRING,
            allowNull:false
        },
        LastName: {
            type:Sequelize.STRING,
            allowNull:false,
          },
          Email:{
              type:Sequelize.STRING,
              allowNull:false,
          },
          Phonenumber:{
              type:Sequelize.INTEGER,
              allowNull:false
          },
          Description:{
              type:Sequelize.TEXT,
              allowNull:false
          },
          Status:{
            type: Sequelize.ENUM,
            values:['Read','Unread']
          },
          ContactedAt:{
            type:Sequelize.DATE,
            allowNull:false,
            defaultValue:Sequelize.NOW
          },
          IpAddress:{
              type:Sequelize.INTEGER
          }
    },{
        timestamps:false
    });

