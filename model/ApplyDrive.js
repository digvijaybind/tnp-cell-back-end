const sequelize=require('../db/db');  //for database connection

const Sequelize=require('sequelize'); //definifn constant and datatype from the sequelize package


 module.exports=sequelize.define('applydrives',{
        UserID:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        CompanyId:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        CreatedAt: {
            type:Sequelize.DATE,
            allowNull:false,
            defaultValue:Sequelize.NOW
          }
    },{
        timestamps:false
    });
   
