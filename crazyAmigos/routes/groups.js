var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var category=mongoose.model('category');
var group=mongoose.model('group');

router.post('/group',function (req,res,next) {
  group.findOne({category:req.body.category,group: req.body.group},function (err,callBackGroup) {
    if(!err){

    }else{

    }
  })

});

module.exports = router;
