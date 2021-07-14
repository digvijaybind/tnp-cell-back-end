const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserMeta=require('../model/UserDetails');
const { roles } = require('../role')



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

exports.signup = async (req, res, next) => {
  User.findOne({ where: { Email: req.body.email } }).then(UserMail => {

    if (UserMail) {
      res.status(409).json({ Errror: 'Email Exist Use new Email' })
    } else {


      bcrypt.genSalt(Math.floor(Math.random() * (15 - 10)) + 10, function (err, salt) {

        if (err) {
          res.status().json({ Error: "Message  " + err })
        } else {

          bcrypt.hash(req.body.password, salt, function (err, hash) {
            // Store hash in your password DB.

            if (err) {
              res.status(502).json({ Error: "Message " + err })
            } else {


             const NewUser = User.build({ Email:req.body.email , Password:hash, confirm_Password:hash })
           
             console.log(NewUser.Email);

             const accessToken = jwt.sign({ID:NewUser.Email},"rightpasswordisradiuspcfeb8", {
              expiresIn: "1d"  //one minute for test purpose
            });

            NewUser.AccessToken=accessToken;
             
             NewUser.save().then((results)=>{
               res.status(200).json({data:results});
               UserMeta.removeAttribute('id');
              UserMeta.create({UserID:results.ID});
             })
            }
          });
        }
      });
    }
  })
}

exports.login = (req, res, next) => {

    const { email,password}=req.body;

    User.findOne({where:{Email:email}}).then((user)=>{
      if(!user){ res.status(200).json({Message:"Email Doesnt Exist"}) }
      

      bcrypt.compare(password,user.Password,(err,result)=>{
        if(!result){
           return res.status(401).json({ message:"Authentication is Failed" });}
        if(result){ 
          const accessToken = jwt.sign({ID:user.ID,Role:user.Role,Email:user.Email},"rightpasswordisradiuspcfeb8", {
            expiresIn: "1d"  //one minute fo test purpose
           });
          user.AccessToken=accessToken;
          user.save().then((result)=>{
            res.status(200).json({
              message:"authentication succeful",
              data:result
            })
          })
        
        }
  
      });
    }).catch(error=>{
      res.status(500).json({
          message:error
      });
  });

}

exports.getallusers = async (req, res, next) => {
  
  User.findAll({ attributes: { exclude: ['Password','AccessToken'] }}).then((results) => {
    if (!results) {
      res.send('no results found')
      res.status(404).send();
    } else {
      res.send(JSON.stringify({ results }));
    }
  }).catch(err => {
    res.status(500).json({
      message: err
    });
  })

}

exports.getUser = async (req, res, next) => {

  const id=req.params.UserId;

  User.findByPk(id).then((result)=>{
    if (!result) {
      res.send('no results found')
      res.status(404).send();
    } else {
      res.send(JSON.stringify({ result }));
    }
  }).catch(err => {
    res.status(500).json({
      message: err
    });
  })

}

exports.updateUser = async (req, res, next) => {
  const id=req.body.UserId;
  User.findByPk(id).then((result)=>{
    if(!result){
      res.send("no user found")
      res.status(404).send();
    }else{
      res.send(JSON.stringify({result}));
    }
  }).catch(err =>{
     res.status(500).json({
       message:err
     });
  })
}

exports.deleteUser = async (req, res, next) => {

  const id=req.params.UserId;
  User.findByPk(id).then((result)=>{
    if(!result){
      res.send('No User Found')
      res.status(404).send();
    }else{
      result.destroy();
             res.status(200).json({
                message:'user Deleted',
                id:id
        
            });
          }
  }).catch(err=>{
    res.status(500).json({
        message:err
    });
})

}


/*association of the the table

User.hasOne(UserMeta,{
    foreignKey:{
        name:'UserID'
    }
})*/


exports.get_single_userdetail=(req,res,next)=>{
  UserMeta.removeAttribute('id');
  const id=req.params.UserID;  //get the products ID
  User.findByPk(id,{
      include:[UserMeta]
  }).then((result)=>{
      if(!result){
          res.status(404).json({ Errror: 'user data Doesnt Exist' })
      }else{
          res.send(JSON.stringify({result}));
      }      
  }).catch(err=>{
      res.status(500).json({
          message:err
      });
  })
};


User.hasOne(UserMeta);

exports.get_alluser_withdetails=(req,res,next)=>{
  UserMeta.removeAttribute('id');
  User.findAll({
    include: [{
      model: UserMeta,
    }]
  }).then((result)=>{
      if(!result){
          res.status(404).json({ Errror: 'Comment Doesnt Exist' })
      }else{
          res.send(JSON.stringify({result}));
      }      
  }).catch(err=>{
      res.status(500).json({
          message:err
      });
  })


}

