const express = require('express');
const router = express.Router();
const ApplyDriveController = require('../controller/C-ApplyDrive');



//router.get('/',.get_all_LikedPost);


router.get('/student/:UserID',ApplyDriveController.allowIfLoggedin,ApplyDriveController.grantAccess('readOwn','applydrive'),ApplyDriveController.bridgedatastudent);

router.get('/company/:CompanyID',ApplyDriveController.allowIfLoggedin,ApplyDriveController.grantAccess('readAny','applydrive'),ApplyDriveController.bridgedatacompany);

router.post('/insertdrive',ApplyDriveController.allowIfLoggedin,ApplyDriveController.grantAccess('createOwn',"applydrive"),ApplyDriveController.applyfordrive);

module.exports=router;
