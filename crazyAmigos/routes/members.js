var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var members = mongoose.model('members');
var teams = mongoose.model('teams');
// var objectID = mongoose.types.ObjectId;
var groups = mongoose.model('groups');

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
  // console.log(req.params.group_id);
  members.aggregate([
    {"$match": {"group": mongoose.Types.ObjectId(req.params.group_id), "status": true},},
    {
      "$group": {
        "_id": "$_id",
        "name": {"$first": "$name"},
        "status": {"$first": "$status"},
        "image": {"$first": "$image"}
      }
    }
  ], function (err, results) {
    if (!err) {
      if (results) {
        console.log(results);
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
router.get('/member/:id', function (req, res, next) {
  members.findOne({_id:req.params.id},function(err,result){
    if(err) throw err;
    console.log(result);
    res.json(result);
  })
  // console.log('members');
  //console.log(req.params.id);
  /*members.findOne({_id: req.params.id}, function (dbError, detailsmember) {
    if (!dbError) {
      console.log(detailsmember);
      for( var i =0 ;i< detailsmember.group.length;i++){
        // console.log(detailsmember.group[i]);

        teams.findOne({'groups._id':detailsmember.group[i]},function (err,result) {
          if(err) throw err;
          // console.log(detailsmember.group[i]);
          for(var j=0; j<result.groups.length;j++){
            console.log(detailsmember.group[i]);
            if(result.groups[j]._id === detailsmember.group[i]){
              console.log(result.groups[i]);
            }

          }

        });
      }
      res.json(detailsmember);
    } else {
      res.send({
        status: 400,
        message: 'Some Error from Database while getting Members List ,Please try after Sometime '
      });
    }
  })*/
});

router.post('/test/:_id', function (req, res, next) {
  console.log('hello');
  members.aggregate([
    /*{$unwind: "$group"},*/
    {
      $lookup: {
        from: "teams",
        localField: "group",
        foreignField: "groups._id",
        as: "teams_Group"
      }
    },
    /*{$unwind: "$teams_Group"},*/
    //{$match: {"teams_Group.groups._id":"$group"}}
    {$match: {'_id': mongoose.Types.ObjectId('5b45cc37820d3b52412406a2'), /*'teams_Group.groups._id':'5b43e35a5c277a11edc81363'*/}},
    /* {
       "$project": {
         // "strMemberTypeName": "$strLevelValue",
         // "teams_Group.groups._id": "$group",
         // "strOne": "$data.strLevelValue"
       }
     }*/

    /*{
      $unwind:"$teams_Group.groups"
    }*/
  ], function (err, data) {
    if (err) {
      res.json(err)
    } else {
      console.log(data);
      res.json(data);
    }
  });
  /*members.aggregate([
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
*/
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
  }],function (err,data){
  res.json(data);
})
/*members.findOne({_id:req.params._id},function (err,data) {
  res.json(data);
})*/
});
router.put('/:id', function (req, res, next) {
  members.findByIdAndUpdate(req.params.id,
    {
      $set: {
        status: req.body.status
      }
    },
    {
      new: true
    }, function (err, updateDetails) {
      if (!err) {
        res.send({
          status: 200,
          message: 'Status Successfully changed'
        });
      } else {
        res.send({
          status: 400,
          message: 'Some Error getting in status change Please try after some time '
        });
      }
    })
})
router.delete('/:id', function (req, res) {
  members.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) {
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
