const express = require('express');
const router = express.Router();
const UserDetailsController = require('../controller/C-UserDetails');


//for admin and manager 
router.get('/alluser',UserDetailsController.allowIfLoggedin,UserDetailsController.grantAccess("readAny","profiledata"),UserDetailsController.get_all_usersdata);

//for admin and Manager
router.post('/:UserID',UserDetailsController.allowIfLoggedin,UserDetailsController.grantAccess("createAny","profiledata"),UserDetailsController.addnew_userdata);

//for admin and manager
router.get('/:UserID',UserDetailsController.allowIfLoggedin,UserDetailsController.grantAccess("readAny","profiledata"),UserDetailsController.get_single_usedetail);

//for admin and manager
router.patch('/:UserID',UserDetailsController.allowIfLoggedin,UserDetailsController.grantAccess("updateAny","profiledata"),UserDetailsController.user_data_update);





// for ever opertion on token is required
//private user detail for only one person when it have only the access token
router.get('/user/userdetailprofile',UserDetailsController.allowIfLoggedin,UserDetailsController.grantAccess('readOwn',"profiledata"),UserDetailsController.get_userprofiledetail);

//for private user
router.post('/user/userdetailprofile/post',UserDetailsController.allowIfLoggedin,UserDetailsController.grantAccess("createOwn","profiledata"),UserDetailsController.private_user_data);

//for single user
router.patch('/user/userdetailprofile/patch',UserDetailsController.allowIfLoggedin,UserDetailsController.grantAccess("updateOwn","profiledata"),UserDetailsController.private_user_data_update);


module.exports = router;