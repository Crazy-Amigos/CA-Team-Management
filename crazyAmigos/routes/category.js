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
              res.json(dbCallback)
            }else{
              console.log('Error db =>: '+dbError)
            }
          });
        }else {
          console.log('category already available');
        }
      }else{
        console.log('error while adding category : '+err);
      }
    });
});

module.exports = router;
