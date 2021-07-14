const express=require('express');
const router=express.Router();
const ContactController=require('../controller/C-ContactUS');


//get all the contact for only manager and admin

router.get('',ContactController.allowIfLoggedin,ContactController.grantAccess('readAny','contact'),ContactController.get_all_contact);


//create new contact for everyone
router.post('',ContactController.create_contact);


//delete only if you have admin rights
router.delete('/:contactID',ContactController.allowIfLoggedin,ContactController.grantAccess('deleteAny','contact'),ContactController.deleate_single_contact);

router.put('/:contactID',ContactController.allowIfLoggedin,ContactController.grantAccess('updateAny','contact'),ContactController.update_contact);



module.exports=router;


