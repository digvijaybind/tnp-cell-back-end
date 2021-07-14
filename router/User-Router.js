const express = require('express');
const router = express.Router();
const userController = require('../controller/C-User');


//public
router.post('/signup', userController.signup);


//public
router.post('/login',userController.login);

//router.get('/alluser',userController.allowIfLoggedin,userController.grantAccess('readAny','profile'),userController.getallusers);

//admin and manager
router.delete('/delete/:UserId',userController.allowIfLoggedin,userController.grantAccess('deleteAny','profiledata'),userController.deleteUser);

//admin and manager
router.get('/alluser',userController.allowIfLoggedin,userController.grantAccess('readAny','profiledata'),userController.getallusers);

//admin and manager
router.get('/oneuser/:UserID',userController.allowIfLoggedin,userController.grantAccess('readAny','profiledata'),userController.get_single_userdetail);


//admin and manager
router.get('/alluserwithdata',userController.allowIfLoggedin,userController.grantAccess('readAny','profiledata'),userController.get_alluser_withdetails);




module.exports = router;