

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

//build connection string
var dbURI='mongodb://localhost/craZyAmigos';

// Create the database connection
mongoose.connect(dbURI);


mongoose.connection.on('connected', function () {
  console.log('Mongoose connected craZyAmigos Server');
});
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected from craZyAmigos Server');
});
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});
var memberSchema = new mongoose.Schema ({
  name : String,
  mob : {type: String, unique:true},
  email : {type: String, unique:true},
  telegram : {type: String, unique:true},
  image: String,
  group:[{type: Schema.ObjectId, ref: 'groups'}],
  place: String,
  status:{type: Boolean, default: false },
  updatedOn : { type: Date, default: Date.now }
});
var categorySchema = new mongoose.Schema ({
  category : {type: String, unique:true},
  description : String,
  updatedOn : { type: Date, default: Date.now }
});
var groupSchema=new mongoose.Schema({
  name: String,
  icon:String,
})

var teamsSchema = new mongoose.Schema ( {
  name: String,
  groups:[groupSchema]
});
var userSchema = new mongoose.Schema ( {
  email: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String
})

/*
var videosSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
  updated_date: { type: Date, default: Date.now },
});

mongoose.model('videos', videosSchema,'videos');
*/
userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
mongoose.model('groups',groupSchema);
mongoose.model('users',userSchema);
mongoose.model('members',memberSchema);
mongoose.model('category',categorySchema);
mongoose.model('teams',teamsSchema);
