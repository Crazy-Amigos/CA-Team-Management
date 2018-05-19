var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var category=mongoose.model('category');
var group=mongoose.model('group');

router.post('/group',function (req,res,next) {
  group.findOne({group:req.body.group,category: req.body.category},function (err,callBackGroup) {
    if(!err){
      if(!callBackGroup){
        var objGroup =new group();
        objGroup.group =req.body.group;
        objGroup.description =req.body.description;
        objGroup.category =req.body.category;
        objGroup.save(function (bdErr,newGroup) {
          if(!bdErr){
            res.send({
              status:200,
              message:'Group successfully Created',
              _id:newGroup.category
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
router.get('/category/group/:id',function (req,res,next) {
  group.find({category:req.params.id},function (err,listGroup) {
    if (!err) {
      res.json(listGroup)
    } else {
      res.send({
        status: 400,
        message: 'dbError : => ' + err
      });
    }
  });
});


module.exports = router;
