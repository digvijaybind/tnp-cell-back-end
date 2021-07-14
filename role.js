const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
  ac.grant("User")
    .readOwn("profile")
    .updateOwn("profile")
    .readOwn("profiledata")
    .updateOwn("profiledata")
    .createOwn("profiledata") 
    .createOwn("applydrive")
    .readOwn("applydrive")
    
    
  ac.grant("Manager")
    .extend("User")
    .readAny("profile")
    .readAny("contact")
    .createAny("profiledata")
    .readAny("profiledata")
    .updateAny("profiledata")
    .readAny("drive")
    .updateAny("drive")
    .createAny("drive")
    .updateAny("applydrive")
    .readAny("applydrive")

  ac.grant("Admin")
    .extend("User")
    .extend("Manager")
    .createAny("contact")
    .updateAny("contact")
    .deleteAny("contact")
    .updateAny("profile")
    .deleteAny("profile")
    .deleteAny("profiledata")
    .deleteAny("drive")
    .deleteAny("applydrive")
  return ac;
})();