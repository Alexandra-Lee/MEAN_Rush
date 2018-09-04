var mongoose = require('mongoose');
var User = require ('./api/models/user');
var Words = require ('./api/models/words');

//connect to MongoDB using Mongoose

mongoose.connect('mongodb://localhost:27017/microblog', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("We're connected!");
});
