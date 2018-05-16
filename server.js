const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
var db=require('./crazyAmigos/model/db');

const api=require('./crazyAmigos/routes/amigosApi');

const port=3000;

const app=express();

app.use(express.static(path.join(__dirname,'dist/crazyamigos')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/amigosApi',api);

app.get('*',function (req,res) {
  res.sendFile(path.join(__dirname,'dist/crazyamigos/index.html'));
});

app.listen(port,function () {
  console.log("CrazyAmigos Server Started...... " );
});
