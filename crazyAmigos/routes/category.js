var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var category=mongoose.model('category');

router.post('/category',function (req,res,next) {
    category.findOne({category:req.body.category},function (err,categ) {
      if(!err){
        if(!categ){
          var objCategory=new category();
          objCategory.category=req.body.category;
          objCategory.designation=req.body.designation;
          objCategory.save(function (dbError,dbCallback) {
            if(!dbError){
              res.send({
                status:200,
                message:'Category successfully Saved'
              })
            }else{
              console.log('Error db =>: '+dbError)
            }
          });
        }else {
          console.log('category already available');
          res.send({
            status:400,
            message:'Category Already Exist'
          })
        }
      }else{
        console.log('error while adding category : '+err);
      }
    });
});
router.get('/category',function (req,res,next) {
  try{
    category.find({},function (err,categors) {
      if(!err){
        res.json(categors);
      }
    })
  }catch (ex){
    console.log('exception => category view :'+ex);
  }
});

module.exports = router;
