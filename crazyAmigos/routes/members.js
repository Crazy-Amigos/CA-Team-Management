var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var members =mongoose.model('members');
var group=mongoose.model('group');
var category= mongoose.model('category');

router.post('/member',function (req,res,next) {
  try{
    var objMembers = new members();
    objMembers.name = req.body.name;
    objMembers.designation = req.body.designation;
    objMembers.description = req.body.description;
    objMembers.mob = req.body.mob;
    objMembers.email = req.body.email;
    objMembers.address = req.body.address;
    objMembers.group = req.body.group;
    objMembers.save(function (err,callbackvalue) {
      if(err){
        console.log('Error in member creation');
      }else{
        // console.log(callbackvalue);
        res.json(callbackvalue);
      }
    });
  }catch (ex){
    console.log('Member Creating Exception :'+ex);
  }

});
router.get('/member',function (req,res,next) {
  members.find({},function (err,mem) {
    if(!err){
      //console.log(mem);
      res.json(mem);
    }else{
      console.log('Error in view member');
    }
  })
});
router.get('/member/:id', function (req,res,next){
  members.findOne({_id:req.params.id}, function(err,data){
    if(!err){
      res.json(data);
    }
  });
});
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

module.exports = router;
