const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
var db=require('./crazyAmigos/model/db');

const users=require('./crazyAmigos/routes/amigosApi');
const members=require('./crazyAmigos/routes/members');
const category=require('./crazyAmigos/routes/category');
const groups=require('./crazyAmigos/routes/groups');

const port=3000;

const app=express();

app.use(express.static(path.join(__dirname,'dist/crazyamigos')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/amigosApi/usr',users);
app.use('/amigosApi/mem',members);
app.use('/amigosApi/cat',category);
app.use('/amigosApi/grp',groups);

app.get('*',function (req,res) {
  res.sendFile(path.join(__dirname,'dist/crazyamigos/index.html'));
});

app.listen(port,function () {
  console.log("CrazyAmigos Server Started...... " );
});
