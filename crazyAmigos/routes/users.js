var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users=mongoose.model('users');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var exp_jwt = require('express-jwt');
var auth = exp_jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.post('/login',function(req,res,next){
  console.log('login');
  passport.authenticate('local', function(err, user, info){
    var token;
    if (err) {
      res.status(404).json(err);
      return;
    }
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
});
router.post('/register',function(req,res,next){
  users.findOne({email:req.body.email},function(dbError,user){
    if(dbError){
      res.send({
        status:400,
        message:'db Error Please try after some time'
      });
    }else if (user){
      res.send({
        status:400,
        message:'This User Already exists '
      });
    }else {
      var objNewUser =new users();
      objNewUser.email=req.body.email;
      objNewUser.setPassword(req.body.password);
      objNewUser.save(function(err){
        var token;
        token = objNewUser.generateJwt();
        console.log(token);
        res.status(200);
        res.json({
          status:200,
          message:'successfully saved',
          token:token
        })
      });
    }
  });
});
router.get('/profile',auth,function(req,res,next){
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
      // Otherwise continue
    users
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }
})

module.exports = router;
