const sequelize=require('../db/db');  //for database connection

const Sequelize=require('sequelize'); //definifn constant and datatype from the sequelize package


 module.exports=sequelize.define('userdetails',{
        UserID:{
            type:Sequelize.INTEGER,
                allowNull:false
        },
        Gender:{
            type:Sequelize.ENUM,
            values:['Male','Female','other'],
            //allowNull:false
        },
        PhNo:{
            type:Sequelize.STRING,
           // allowNull:false
        },
        Branch:{
            type:Sequelize.ENUM,
            values:['COMP','IT','ETRX','EXTC','CIVIL','MECH'],
            //allowNull:false

        },
        SscMarks:{
            type:Sequelize.DOUBLE,
            //allowNull:false
        },
        HscMarks:{
            type:Sequelize.DOUBLE,
            //allowNull:false

        },
        BeAvg:{
            type:Sequelize.DOUBLE,
           // allowNull:false
        },
        Placed:{
            type:Sequelize.ENUM,
            values:['Placed','NotPlaced'],
            //allowNull:false
        },
         CreatedAt:{
            type:Sequelize.DATE,
            allowNull:false,
            defaultValue:Sequelize.NOW
        }, 
      },{
        timestamps:false
    });

