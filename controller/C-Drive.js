const Drive=require('../model/drive');



const Sequelize=require('sequelize');
const {QueryTypes}=require('sequelize');
const db=require('../db/db')
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
  
  


exports.get_all_drive=(req,res)=>{
    Drive.findAll().then((results)=>{
        if(!results){
            res.send('no results found')
            res.status(404).send();
        }else{
            res.send(JSON.stringify({results}));
           /* res.status(200).json({
                message:'handling get request for  /post'        
            });*/
        }
    }).catch(err=>{
        res.status(500).json({
            message:err
        });
    })
};




//get all drive with status active 
exports.get_public_company=(req,res,next)=>{
  const user = res.locals.user;
  console.log("from the public drive ".user)

  Drive.findAll({
        where:{
         Status:"Active"
        },
  })
  .then((result)=>{
      if(!result){
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



//update a category
exports.update_company=  (req,res)=>{
 
  const ID=req.params.companyID;

  const data={
  CompanyName:req.body.name,
  DriveDate:req.body.dd,
  Detail:req.body.des,
  Salary:req.body.salary,
  AllowedBranches:req.body.alb,
  PercentageCrieteria:req.body.prc,
  LastDateApply:req.body.lda,
  Status:req.body.status
}

  Drive.findByPk(ID).then((drive)=>{
    if(!drive){
      res.status(404).json({
          Message:"Drive Not Found"
      })
    }else{
      drive.update(data).then((result)=>{
        if(result){
          res.status(200).json({
            Message:"Drive Data Updated Succesfully!"
          })
        }else{
          res.status(500).json({
            Message:"Cant Upate Drive"
          })
        }
      }).catch(err=>{
        res.status(500).json({
            Message:err
        });
    })
    }
  }).catch(err=>{
    res.status(500).json({
        Message:err
    });
})
}


   /*drives  = await db.query(`UPDATE drives SET CompanyName=(:CompanyName),DriveDate=(:DriveDate) ,Detail=(:Detail),Salary=(:Salary),AllowedBranches=(:AllowedBranches), PercentageCrieteria=(:PercentageCrieteria) , LastDateApply=(:LastDateApply), Status=(:Status) WHERE ID = 1`
, {  replacements: {CompanyName:req.body.name,DriveDate:req.body.dd,Detail:req.body.des,Salary:req.body.salary,AllowedBranches:req.body.ald,PercentageCrieteria:req.body.prc,LastDateApply:req.body.lda,Status:req.body.status,ID:req.params.companyID},
     type: db.QueryTypes.UPDATE})
  .then(function(users) {
    res.send(users);
  }).catch(err=>{
      res.status(500).json({
          message:err
      });
  })*/



exports.create_company=async (req,res)=>{
    

  drives  = await db.query(`INSERT INTO drives (CompanyName,DriveDate,Detail,Salary,AllowedBranches,PercentageCrieteria,LastDateApply,UserID,Status) VALUES ( (:CompanyName), (:DriveDate),(:Detail),(:Salary),(:AllowedBranches),(:PercentageCrieteria),(:LastDateApply),(:UserID),(:Status) )`
, {  replacements: {CompanyName:req.body.name,DriveDate:req.body.dd,Detail:req.body.des,Salary:req.body.salary,AllowedBranches:req.body.ald,PercentageCrieteria:req.body.prc,LastDateApply:req.body.lda,UserID:req.body.uid,Status:req.body.status },
   
    type: db.QueryTypes.INSERT})
  .then(function(users) {
    res.send(users);
   
  }).catch(err=>{
      res.status(500).json({
          message:err
      });
    console.log(err)
  })
  
    
};

/*drives  = await db.query(`INSERT INTO drives (CompanyName,DriveDate,Detail,Salary,AllowedBranches,PercentageCrieteria,LastDateApply,UserID,Status) VALUES ( (:CompanyName), (:DriveDate),(:Detail),(:Salary),(:AllowedBranches),(:PercentageCrieteria),(:LastDateApply),(:UserID),(:Status) )`
, {  replacements: {CompanyName:req.body.name,DriveDate:req.body.dd,Detail:req.body.des,Salary:req.body.salary,AllowedBranches:req.body.ald,PercentageCrieteria:req.body.prc,LastDateApply:req.body.lda,UserID:req.body.uid,Status:req.body.status },
   
    type: db.QueryTypes.INSERT})
  .then(function(users) {
    res.send(users);
   
  }).catch(err=>{
      res.status(500).json({
          message:err
      });
    console.log(err)
  })*/
    




//deleate a single Comapny
exports.deleate_single_company=(req,res)=>{

  const user = res.locals.user;
  console.log("local user",user)
 // console.log("email "+req.userData.email + " " + "id "+req.userData.id);
  const id=req.params.companyID;  //get the company ID
  Drive.findByPk(id).then((companydata) => {
      if(!companydata){
          res.status(500).json({
             id:id+"Company Doesnt exist",
          });
      }
      else{
          companydata.destroy();
           res.status(200).json({
              deleted:user,
              message:'Comoany Deleted',
              id:id
      
          });
      }
    }).catch(err=>{
      res.status(500).json({
          message:err
      });
  })

}


