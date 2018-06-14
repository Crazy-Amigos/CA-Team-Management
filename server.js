const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
var db=require('./crazyAmigos/model/db');
const fileUpload = require('express-fileupload');

const users=require('./crazyAmigos/routes/amigosApi');
const members=require('./crazyAmigos/routes/members');
const category=require('./crazyAmigos/routes/category');
const groups=require('./crazyAmigos/routes/groups');
const teams=require('./crazyAmigos/routes/team');

const port=3000;

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

app.use('/amigosApi/teams',teams);
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

app.listen(port,function () {
  console.log("CrazyAmigos Server Started...... " );
});
