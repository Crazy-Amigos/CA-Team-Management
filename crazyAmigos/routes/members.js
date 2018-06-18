var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var members = mongoose.model('members');

router.post('/', function (req, res, next) {
  if (req.files) {
    // console.log(req.body);
    var uploadFile = req.files.uploadFile;
    members.findOne({mob: req.body.mob}, function (dbErro, objmem) {
      if (!dbErro) {
        if (!objmem) {
          var objMember = new members();
          objMember.name = req.body.name;
          objMember.mob = req.body.mob;
          objMember.email = req.body.email;
          objMember.telegram = req.body.telegram;
          objMember.image = '/uploads/members/' + req.body.mob + "_dp.jpeg";
          objMember.place = req.body.place;
          objMember.group = req.body.group;
          objMember.status = true;
          objMember.save(function (dbSavingError, savedData) {
            if (!dbSavingError) {
              uploadFile.mv('public/uploads/members/' + req.body.mob + '_dp.jpeg', function (err) {
                if (!err) {
                  res.send({
                    status: 200,
                    message: 'User Successfully created '
                  });
                }
                else {
                  console.log(err);
                }
              });
            } else {
              res.send({
                status: 400,
                message: 'Please Telegram,Email already used or not'
              });
            }
          })
        } else {
          res.send({
            status: 400,
            message: 'this Mobile number Already REGISTER , Please try new one '
          });
        }
      } else {
        res.send({
          status: 400,
          message: 'Some Error while creating new Member Please try again'
        });
      }
    })
  } else {
    res.send({
      status: 400,
      message: 'Please select one Profile picture '
    })
  }

})
router.get('/', function (req, res, next) {
  members.find({}, function (dbErrorMemberList, dataFromDb) {
    if (!dbErrorMemberList) {
      res.json(dataFromDb);
    } else {
      res.send({
        status: 400,
        message: 'Some Error from Database while getting Members List ,Please try after Sometime '
      })
    }
  });
});
router.get('/:group_id', function (req, res, next) {
  members.aggregate([
    {"$match": {"group": req.params.group_id}},
    {
      "$group": {
        "_id": "$_id",
        "name": {"$first": "$name"},
        "image": {"$first": "$image"}
      }
    }
  ], function (err, results) {
    if (!err) {
      if (results) {
        res.json(results);
      } else {
        res.send({
          status: 400,
          message: 'No User Found'
        })
      }
    }
    else {
      res.send({
        status: 400,
        message: 'Some Error from Database while getting Members List ,Please try after Sometime '
      })
    }
  })
});
router.get('/member/:id', function (req, res, next){
  members.findOne({_id:req.params.id},function(dbError,detailsmember){
    if(!dbError){
      res.json(detailsmember);
    }else{
      res.send({
        status: 400,
        message: 'Some Error from Database while getting Members List ,Please try after Sometime '
      });
    }
  })
});
router.get('/test/:id', function (req, res, next){
  members.findOne({_id:req.params.id})
    .populate('group')
    .exec(function(err,messsages) {
      if (err) throw err;
      res.json(messsages);
    });
});

module.exports = router;
