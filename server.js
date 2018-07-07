const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
var db=require('./crazyAmigos/model/db');
var passport=require('passport');
const fileUpload = require('express-fileupload');
require('./crazyAmigos/config/passport');
const cors = require('cors');

const users=require('./crazyAmigos/routes/users');
const members=require('./crazyAmigos/routes/members');
const category=require('./crazyAmigos/routes/category');
const groups=require('./crazyAmigos/routes/groups');
const teams=require('./crazyAmigos/routes/team');


const port=8081;

const app=express();

app.use(express.static(path.join(__dirname,'dist/crazyamigos')));
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
  next();
});
var originsWhitelist = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:*',
];
var corsOptions = {
  origin: function (origin, callback) {
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
}
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use('/amigosApi/teams',teams);
app.use('/amigosApi/mem',members);
app.use('/amigosApi/auth',users);
// Static files
app.use(express.static(__dirname + '/public'));

/*
app.use('/amigosApi/usr',users);
app.use('/amigosApi/mem',members);
app.use('/amigosApi/cat',category);
app.use('/amigosApi/grp',groups);
*/

app.get('*',function (req,res) {
  res.sendFile(path.join(__dirname,'dist/crazyamigos/index.html'));
});
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});
app.listen(port,function () {
  console.log("CrazyAmigos Server Started...... " );
});
