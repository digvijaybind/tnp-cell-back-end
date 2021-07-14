const ContactUS=require('../model/ContactUS');
const {roles} =require('../role');



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
  





//get all category
exports.get_all_contact=(req,res)=>{
    ContactUS.findAll().then((results)=>{
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





//get a single category

exports.get_single_contact=(req,res,next)=>{
    
    const id=req.params.contactID;  //get the products ID
    ContactUS.findByPk(id).then((result) => {
        if(!result){
            res.status(500).json({
               id:id+" Doesnt exist ",
            });
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
exports.update_contact=(req,res)=>{

    
    const id=req.params.contactID;

    const UpdateOps={}
    for (const ops of req.body){
        UpdateOps[ops.propName]=ops.value;
    }
   
    ContactUS.findByPk(id).then((contactdata)=>{
        contactdata.update(UpdateOps).then((result)=>{
            res.status(200).json({
                message:result
            });
        })
    }).catch(err=>{
        res.status(500).json({
            message:err
        });
    });
}



//create a new Category
exports.create_contact=(req,res)=>{

    const data={
        FirstName:req.body.fname,
        LastName:req.body.lname,
        Email:req.body.email,
        Phonenumber:req.body.phno,
        Description:req.body.description,
     
    };

    ContactUS.create(data).then((results)=>{
        if(!results){
            res.send('No results found')
            res.status(404).send();
        }else{
            res.send(JSON.stringify({results}));
            /*res.status(200).json({
                message:'handling PSOT request for /post',
                createdPost:data
            }); */  
        }
      
    }).catch(err=>{
        res.status(500).json({
            message:err
        });
    })
 
};



//deleate a single Category
exports.deleate_single_contact=(req,res)=>{
   // console.log("email "+req.userData.email + " " + "id "+req.userData.id);
    const id=req.params.contactID;  //get the products ID
    ContactUS.findByPk(id).then((contactdata) => {
        if(!contactdata){
            res.status(500).json({
               id:id+"Doesnt exist",
            });
        }
        else{
            contactdata.destroy();
             res.status(200).json({
                message:'Contact deleted',
                id:id
        
            });
        }
      }).catch(err=>{
        res.status(500).json({
            message:err
        });
    })

}