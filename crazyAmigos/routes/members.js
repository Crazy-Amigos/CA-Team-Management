var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var members = mongoose.model('members');
var teams=mongoose.model('teams');
var groups=mongoose.model('groups');

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
    {"$match": {"_id": req.params.group_id}},
    {
      "$group": {
        "_id": "$_id",
        "name": {"$first": "$name"},
        "status": {"$first": "$status"},
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
  // console.log('members');
  //console.log(req.params.id);
  members.group.findOne({_id:req.params.id},function(dbError,detailsmember){
    if(!dbError){
      console.log(detailsmember);
      res.json(detailsmember);
    }else{
      res.send({
        status: 400,
        message: 'Some Error from Database while getting Members List ,Please try after Sometime '
      });
    }
  })
});
router.post('/test/:_id', function (req, res, next){
  members.aggregate([
    {
      $unwind: "$group"
    },
    { $match : { '_id': mongoose.Types.ObjectId('5b30c2203ab3a038335dbc95') } },
    {
      $lookup: {
        from: "teams",
        localField: "group",
        foreignField: "groups._id",
        as: "teams_Group"
      }
    },
    {
      $project: {
        name: 1,
        group: 1,
        teams_Group:1,
        Result: {
          $cond:
            {
              if:
                {
                  $eq: ['$group', 'teams_Group.groups._id']
                },
              then:
                {
                  name:'$name',
                  group_name:'$group.name'
                }
              , else: "poor"
            }
        }

      }
    }

    /*{
      $group: {
        _id: {
          _id:"$_id",
          group: "$group",
          status: "$status",
          name: "$name",
          email: "$email",
          telegram: "$telegram",
          group:"$teams_Group.groups._id"
        },
      }
    },*/

  /*  {
      $unwind: "$groups"
    }*/
    /*,
    {
      $project:{
        name:1,
        group:1,
        Result:{
          $cond:
            {if:
                {
                  $eq:['$group','$group']
                },
              then:"good",else:"poor"
            }
        }

      }
    }*/
/*    { $match : { '$group': mongoose.Types.ObjectId('$$teams_Group.groups._id')} },
    {$cond:{if:{if:{$gte:[]}}}}*/
    /*{'$$groups':["$$groups",mongoose.Types.ObjectId('5b3088b5fe62c60c9ea7bf8e')]}*/
    /*{ $match : { 'group': mongoose.Types.ObjectId('groups._id') } },*/
    /*,
    {
      $unwind: "$address"
    },
    ,
    {
      $lookup: {
        from: "teams",
        localField: "group",
        foreignField: "groups._id",
        as: "address"
      }
    }
    {
      $lookup: {
        from: "addressComment",
        localField: "address._id",
        foreignField: "address_id",
        as: "address.addressComment"
      }
    }*/],function (err,data){
    res.json(data);
  })
  /*members.findOne({_id:req.params._id},function (err,data) {
    res.json(data);
  })*/
});
router.put('/:id',function (req,res,next) {
  members.findByIdAndUpdate(req.params.id,
    {
      $set: {
        status:req.body.status
      }
    },
    {
      new:true
    },function (err,updateDetails) {
      if(!err){
        res.send({
          status: 200,
          message: 'Status Successfully changed'
        });
      }else{
        res.send({
          status: 400,
          message: 'Some Error getting in status change Please try after some time '
        });
      }
    })
})
router.delete('/:id',function (req,res) {
  members.findByIdAndRemove(req.params.id,function (err,data) {
    if(err){
      res.send({
        status: 400,
        message: 'Some Error getting in status change Please try after some time '
      });
    } else {
      res.send({
        status: 200,
        message: 'Member Successfully Deleted'
      });
    }
  })
})
module.exports = router;
