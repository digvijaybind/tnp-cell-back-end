const sequelize=require('../db/db');  //for database connection

const Sequelize=require('sequelize'); //definifn constant and datatype from the sequelize package

 module.exports=sequelize.define('drives',{
        ID:{
            type:Sequelize.INTEGER,
            autonIncrement:true,
            primaryKey: true,
            autoIncrement:true
        },
        CompanyName:{
            type:Sequelize.STRING,
            //allowNull:false
        },
        DriveDate:{
            type:Sequelize.DATE,
        },
        Detail:{
           type:Sequelize.TEXT,
           //allowNull:false
        },
        Salary:{
            type:Sequelize.DOUBLE,
            //allowNull:false
        },
        AllowedBranches:{
            type:Sequelize.STRING,
            allowNull:true
        },
        PercentageCrieteria:{
            type:Sequelize.DOUBLE,
            //allowNull:false
        },
        LastDateApply:{
          type:Sequelize.STRING,
         // allowNull:false
        },
        UserID:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        Status: {
            type: Sequelize.ENUM,
            values:['Activate','NonActive']
        },
        CreatedAt:{
            type:Sequelize.DATE
        }
    },
    {
        timestamps:false
    });

