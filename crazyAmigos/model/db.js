

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var userSchema = new mongoose.Schema({
  userName : {type: String, unique:true},
  password : String,
  CreatedOn: { type: Date, default: Date.now },
  updatedOn : { type: Date, default: Date.now }
});
var memberSchema = new mongoose.Schema ({
  name : String,
  designation : String ,
  description : String,
  mob : {type: String, unique:true},
  email : {type: String, unique:true},
  address : String,
  updatedOn : { type: Date, default: Date.now }
});
var categorySchema = new mongoose.Schema ({
  category : {type: String, unique:true},
  designation : String,
  updatedOn : { type: Date, default: Date.now }
});
var groupSchema = new mongoose.Schema ( {
  group: String ,
  description : String,
  category :[{ type: Schema.Types.ObjectId, ref: 'categories' }],
  updatedOn : { type: Date, default: Date.now },
})
mongoose.model('users',userSchema);
mongoose.model('members',memberSchema);
mongoose.model('category',categorySchema);
mongoose.model('group',groupSchema);
/*
var videosSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
  updated_date: { type: Date, default: Date.now },
});

mongoose.model('videos', videosSchema,'videos');
*/
