
const express = require("express");
const app = express();
const cors=require('cors');
const morgan=require('morgan');
const bodyparser=require('body-parser');
const User=require('./model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const UserRouter=require('./router/User-Router');
const ContactRouter=require('./router/ContactUs-Route');
const DriveRouter=require('./router/Drive-Routers');
const ApplyDriveRouter=require('./router/ApplyDrive-Router');
const UserDetailsRouter=require('./router/UserDetails-Router');





app.use(bodyparser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: true }));



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});



app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { ID, exp } = await jwt.verify(accessToken, "rightpasswordisradiuspcfeb8");
      // If token has expired
      console.log("Accestoken "+accessToken);
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one"
        });
      }
      console.log("ID  "+ID);
      
    
      let result= await User.findByPk(ID);
      result.save();
      res.locals.user=result.toJSON();
      console.log(res.locals.user);
     //Wconsole.log("logged in user + "+ req.locals.loggedInUser)
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});




app.use('/user',UserRouter);
app.use('/contact',ContactRouter);
app.use('/drive',DriveRouter);
app.use('/applydrive',ApplyDriveRouter);
app.use('/userdata',UserDetailsRouter);








  module.exports = app;