var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var group =mongoose.model('groups');
var members=mongoose.model('members');
var fs = require('fs');

router.post('/:teamName',function (req,res,next) {
  console.log('group post');
  if(req.files) {
    // var link = 'public/uploads/groups/'+req.params.name+'/'+req.body.name+'.jpeg';
    var uploadFile = req.files.uploadFile;
    var link = 'public/uploads/groups/' + req.params.teamName + '/' + req.body.name + '.jpeg';
    group.findOne({team: req.params.teamName} && {name: req.body.name}, function (err, result) {
      if (err) {
        res.send({
          status: 400,
          message: err
        });
      } else if (result) {
        res.send({
          status: 400,
          message: 'Group Already exists'
        });
      } else {
        var objGroup = new group();
        objGroup.name=req.body.name;
        objGroup.icon='/uploads/groups/'+req.params.teamName+'/'+req.body.name+'.jpeg';
        objGroup.team=req.params.teamName;
        objGroup.status='false';
        objGroup.save(function (dbErr, dbResult) {
          if (dbErr) throw dbErr;
            uploadFile.mv(link,function(err) {
              if (dbErr) throw dbErr;
                res.send({
                  status: 200,
                  message: 'successfully created'
                });
            });
        });
      }
    })
  } else {
    res.send({
      status: 400,
      message: 'No file !!!'
    });
  }
});
router.post('/delete/:grpID',function(req,res,next){
  members.findOne({group:req.params.grpID},function(err,result){
    if(err) throw err;
    if(!result){
      group.findOneAndDelete({_id:req.params.grpID},function(grpError,grpResult){
        if(grpError) throw grpError;
        fs.unlink('public'+grpResult.icon,function(err){
          if(err) throw err;
          res.send({
            status: 200,
            message: 'deleted Success'
          });
        });
      });
    } else {
      console.log(result);
      res.send({
        status: 400,
        message: 'Rafarance in Members'
      });
    }
  })
});
router.post('/getGroup/:id',function(req,res,next){
  group.findOne({_id:req.params.id},function(err,result){
    if(err) throw err;
    console.log(result);
    res.json(result);
  });
});
router.post('/doEdit/group/:id',function (req,res,next) {
  if(req.files) {
    // console.log(req);
    var uploadFile = req.files.uploadFile;
    var link = 'public/uploads/groups/'+req.body.team+'/'+req.body.name+'.jpeg';
    uploadFile.mv(link,function(err){
      if(!err){
        res.send({
          status:200,
          message:'successfully created'
        });
      }
      else {
        res.send({
          status:400,
          message:'successfully created' + err
        });
      }
    });

  }else {
    res.send({
      status:400,
      message:'Please Select  file'
    });
  }
})
module.exports = router;
