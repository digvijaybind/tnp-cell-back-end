const express = require('express');
const router=express.Router();
const DriveController=require('../controller/C-Drive');




//for admin and manager
router.get('/',DriveController.allowIfLoggedin,DriveController.grantAccess('readAny','drive'),DriveController.get_all_drive);

//for public and student
router.get('/publicdrive',DriveController.get_public_company);

//for admin and manager
router.delete('/:companyID',DriveController.allowIfLoggedin,DriveController.grantAccess('deleteAny','drive'),DriveController.deleate_single_company);

//for admin and manager
router.post('/',DriveController.allowIfLoggedin,DriveController.grantAccess('createAny','drive'),DriveController.create_company);

//update company only for admin and manager
router.patch('/:companyID',DriveController.allowIfLoggedin,DriveController.grantAccess('updateAny','drive'),DriveController.update_company);



module.exports=router;
