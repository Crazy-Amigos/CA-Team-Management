var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var members =mongoose.model('members');

router.post('/member',function (req,res,next) {
  try{
    var objMembers = new members();
    objMembers.name = req.body.name;
    objMembers.designation = req.body.designation;
    objMembers.description = req.body.description;
    objMembers.mob = req.body.mob;
    objMembers.email = req.body.email;
    objMembers.address = req.body.address;
    objMembers.save(function (err,callbackvalue) {
      if(err){
        console.log('Error in member creation');
      }else{
        res.json(callbackvalue);
      }
    });
  }catch (ex){
    console.log('Member Creating Exception :'+ex);
  }

});
router.get('/member',function (req,res,next) {
  members.find({},function (err,members) {
    if(!err){
      res.json(members);
    }else{
      console.log('Error in view member');
    }
  })
})
module.exports = router;
