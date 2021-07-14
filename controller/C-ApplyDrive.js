const UserDetails=require('../model/UserDetails');
const UserModel=require('../model/User');
const CompanyModel=require('../model/drive');

const ApplyDriveModel=require('../model/ApplyDrive')

const {QueryTypes}=require('sequelize');
const sequelize=require('../db/db')
const { roles } = require('../role')


const Op = require('Sequelize').Op


exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
      try {
        const permission = roles.can(req.user.Role)[action](resource);
        console.log(permission);
        if (!permission.granted) {
          return res.status(401).json({
            error: "You don't have enough permission to perform this action"
          });
        }
        next()
      } catch (error) {
        next(error)
      }
    }
  }
  
  exports.allowIfLoggedin = async (req, res, next) => {
    try {
      const user = res.locals.user;
      if (!user)
        return res.status(401).json({
          error: "You need to be logged in to access this route",
          data:user
        });
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }
  







ApplyDriveModel.hasMany(UserModel, {
    foreignKey : 'ID',
    sourceKey: 'UserID'
});

ApplyDriveModel.hasMany(CompanyModel, {
  foreignKey : 'ID',
  sourceKey: 'CompanyId'
})


UserModel.belongsTo(ApplyDriveModel, {
  foreignKey : 'ID',
  targetKey: 'UserID'
});

CompanyModel.belongsTo(ApplyDriveModel, {
  foreignKey : 'ID',
  targetKey: 'CompanyId'
});

UserModel.hasOne(UserDetails,{
  foreginKey:{
    name:"ID"
  }
});




exports.bridgedatastudent=(req,res,next)=>{

  const ID=req.params.UserID

  ApplyDriveModel.removeAttribute('id')
  ApplyDriveModel.findAll({
    include:[{
      model:UserModel,
      where:{ID:ID},
      attributes: ['ID','Name', 'Email', 'Role']
    },{
      model:CompanyModel
    }]
  }).then(results=>{
      if(!results){
        res.status(404).json({ Errror: 'data Doesnt Exist' })
      }else{
        res.send(JSON.stringify({results}));
      }
    }).catch(err=>{
      res.status(500).json({
        message:err
    });
    })

  }



  
exports.bridgedatacompany=(req,res,next)=>{

  const ID=req.params.CompanyID

  ApplyDriveModel.removeAttribute('id')
  UserDetails.removeAttribute('id')
  ApplyDriveModel.findAll({
    include:[{
      model:CompanyModel,
      where:{ID:ID},
    },{
      model:UserModel,
      attributes: ['ID','Name', 'Email', 'Role'],
      include:[UserDetails,ApplyDriveModel]
    }],
  }).then(results=>{
      if(!results){
        res.status(404).json({ Errror: 'Company Doesnt Exist' })
      }else{
        res.send(JSON.stringify({results}));
      }
    }).catch(err=>{
      res.status(500).json({
        message:err
    });
    })

  }


  
exports.applyfordrive=(req,res,next)=>{

    ApplyDriveModel.removeAttribute('id');
    const data={
        CompanyId:req.body.companyid,
        UserID:req.body.userid
        
    }
     ApplyDriveModel.create(data).then((result)=>{
      if(!result){
          res.send('Cant Apply found')
          res.status(404).send();
      }else{
          res.send(JSON.stringify({result}));
      }
    
  }).catch(err=>{
      res.status(500).json({
          message:err
      });
  })

};










