var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var members =mongoose.model('members');

router.post('/member',function (req,res,next) {
  console.log("Hello")
  var objMembers = new members();
  objMembers.name = req.body.name;
  objMembers.designation = req.body.designation;
  objMembers.description = req.body.description;
  objMembers.mob = req.body.mob;
  objMembers.email = req.body.email;
  objMembers.save(function (err,callbackvalue) {
    if(err){
      res.send('Error');
    }else{
      res.json(callbackvalue);
    }
  })
});
module.exports = router;
