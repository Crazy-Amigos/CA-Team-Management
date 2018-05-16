

var mongoose = require('mongoose');

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

/*
var videosSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
  updated_date: { type: Date, default: Date.now },
});

mongoose.model('videos', videosSchema,'videos');
*/
