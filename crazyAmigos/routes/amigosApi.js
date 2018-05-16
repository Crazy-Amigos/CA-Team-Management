var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users =mongoose.model('users');

router.post('/login',function (req,res,next) {
  res.send('Hello Api Working !!!!!!!!!!!!!!');
});
module.exports = router;
