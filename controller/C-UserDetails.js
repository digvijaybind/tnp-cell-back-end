const UserDetails=require('../model/UserDetails');
const userModel=require('../model/User');



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
  
  


exports.get_all_usersdata=(req,res)=>{
    UserDetails.removeAttribute('id');
    UserDetails.findAll().then((results)=>{
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



exports.addnew_userdata=(req,res,next)=>{

  const ID=req.params.UserID;
  UserDetails.removeAttribute('id');
  const data={
    UserID:ID,
    Gender:req.body.gender,
    PhNo:req.body.phno,
    Branch:req.body.branch,
    SscMarks:req.body.sscmarks,
    HscMarks:req.body.hscmarks,
    BeAvg:req.body.beavg,
    Placed:req.body.placed
  }

  userModel.findByPk(ID).then((user)=>{
    if(!user){
      res.status(409).json({ Errror: 'User Doesnt Exist Please Create A New User' })
    }else{
      UserDetails.create(data).then((results)=>{
        if(!results){
            res.send('no results found')
            res.status(404).send();
        }else{
            res.send(JSON.stringify({results}));
        }
    }).catch(err=>{
        res.status(500).json({
            message:err
        });
    })
    }

  })
};





exports.get_single_usedetail=async (req,res)=>{
  const ID=req.params.UserID
  
  UserDetails.removeAttribute('id');
  UserDetails.findOne({where: { UserID:ID }}).then((result)=>{
      if(!result){
          res.send('no results found')
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



exports.user_data_update=async (req,res,next)=>{

  const ID=req.params.UserID
  UserDetails.removeAttribute('id');
  const data={
    Gender:req.body.gender,
    PhNo:req.body.phno,
    Branch:req.body.branch,
    SscMarks:req.body.sscmarks,
    HscMarks:req.body.hscmarks,
    BeAvg:req.body.beavg,
    Placed:req.body.placed
  }
  await UserDetails.findOne({
     where: { UserID: ID }
     }).then((user)=>{

      if(!user){
        res.status(404).json({
          message:"Not Found",
          ID:ID
        })
      }else{
        user.update(data).then((result)=>{
          if(!result){
            res.status(404).json({
              message:"Not Found",
              ID:ID
            })
          }else{
            res.status(200).json({
              message:"Succesful"
            })
          }
        })
      }
     })
}










exports.get_userprofiledetail=(req,res)=>{
  //res.send("working");
  const user = res.locals.user;
  const ID=user.ID
  console.log("User id for the user profile ",ID)
  UserDetails.removeAttribute('id');
  UserDetails.findOne({where: { UserID:ID }}).then((result)=>{
      if(!result){
          res.send('no results found')
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


exports.private_user_data=async (req,res,next)=>{

  const user = res.locals.user;
  const ID=user.ID
  UserDetails.removeAttribute('id');
  const data={
    UserID:ID,
    Gender:req.body.gender,
    PhNo:req.body.phno,
    Branch:req.body.branch,
    SscMarks:req.body.sscmarks,
    HscMarks:req.body.hscmarks,
    BeAvg:req.body.beavg,
    Placed:req.body.placed
  }

 await userModel.findByPk(ID).then((user)=>{
    if(!user){
      res.status(409).json({ Errror: 'User Doesnt Exist Please Create A New User' })
    }else{
      UserDetails.create(data).then((results)=>{
        if(!results){
            res.send('no results found')
            res.status(404).send();
        }else{
            res.send(JSON.stringify({results}));
        }
    }).catch(err=>{
        res.status(500).json({
            message:err
        });
    })
    }

  })
};




exports.private_user_data_update=async (req,res,next)=>{

  const user = res.locals.user;
  const ID=user.ID
  UserDetails.removeAttribute('id');
  const data={
    Gender:req.body.gender,
    PhNo:req.body.phno,
    Branch:req.body.branch,
    SscMarks:req.body.sscmarks,
    HscMarks:req.body.hscmarks,
    BeAvg:req.body.beavg,
    Placed:req.body.placed
  }
  await UserDetails.findOne({
     where: { UserID: ID }
     }).then((user)=>{

      if(!user){
        res.status(404).json({
          message:"Not Found",
          ID:ID
        })
      }else{
        user.update(data).then((result)=>{
          if(!result){
            res.status(404).json({
              message:"Not Found",
              ID:ID
            })
          }else{
            res.status(200).json({
              message:"Succesful"
            })
          }
        })
      }
     })
}

