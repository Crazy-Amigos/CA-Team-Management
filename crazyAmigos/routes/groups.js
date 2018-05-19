var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var category=mongoose.model('category');
var group=mongoose.model('group');

router.post('/group',function (req,res,next) {
  group.findOne({category:req.body.category,group: req.body.group},function (err,callBackGroup) {
    if(!err){
      if(!callBackGroup){
        var objGroup =new group();
        objGroup.group =req.boady.group;
        objGroup.designation =req.boady.designation;
        objGroup.category =req.boady.category;
        objGroup.save(function (bdErr,newGroup) {
          if(!bdErr){
            res.send({
              status:200,
              message:'Group successfully Saved'
            })
          }
          else{
            res.send({
              status:100,
              message:'dbError = > :'+bdErr
            });
          }
        });
      }
      else{
        res.send({
          status:400,
          message:'Group Name Alredy exists'
        });
      }
    }
    else{
      res.send({
        status:100,
        message:'Error = > :'+err
      });
    }
  });
});

module.exports = router;
