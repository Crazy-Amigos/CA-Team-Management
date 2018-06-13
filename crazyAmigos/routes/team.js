var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var teams=mongoose.model('teams');

router.get('/',function (req,res,next) {
  teams.find({},function (err,listTeam) {
    if(!err){
      res.json(listTeam);
    }else{
      console.log('Error : (Teams) => dbError');
    }
  })
})
router.post('/',function (req,res,next) {
  teams.findOne({name:req.body.name},function (bdError,teamList) {
    if(!bdError){
      if(!teamList){
        var objTeams=new teams();
        objTeams.name =req.body.name;
        objTeams.save(function (teamDbError,newTeam) {
          if(!teamDbError) {
            res.send({
              status:200,
              message:'Team Successfully created'
            });
          }else{
            res.send({
              status:400,
              message:'Team Creation Error ,please retry again'
            });
          }
        });
      }else{
        res.send({
          status:400,
          message:'Team Already exists'
        });
      }
    }else{
      console.log('Error : (Teams) => dbError new User');
    }
  });
});
router.post('/:name',function (req,res,next) {
  if(req.files){
    console.log(req.files);
  }
  else{
    res.send({
      status:400,
      message:'Please Select  file'
    });
  }

})


module.exports = router;
