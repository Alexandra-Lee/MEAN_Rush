var mongoose = require('mongoose');
var validator = require('validator')
//console.log ("just a test");
var UserSchema = new mongoose.Schema ({

    username: {type: String, lowercase: true, required: true, unique: true, trim: true, validate: {
        validator: function(valid) {
            return /^[a-zA-Z_]+/.test(valid);
        },
        message: 'Your username must begin with a letter A-Z and be at least 5 characters.'
    }},
    email: {type: String, lowercase: true, required: true, unique: true, required: true, validate: (value) => {
        return validator.isEmail(value)}
    },
    password: {type: String, lowercase: true, required: true},
    passwordConf: {type: String, required: true},
    avatar: {type: Buffer, default: null},
    created: {type: Date, }

});

//authenticate input against database

var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if (err) return next(err);
        else {
        user.password = hash;
        next();
        return ("You have successfully registered.");
        }
    }); 
});

UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
    }  
var User = mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);

//added a user into microblog db:
// var userOne = new User ({
//     _id: new mongoose.Types.ObjectId,
//     username: 'Nelson',
//     email: 'alexandra.lee@coding-academy.fr',
//     password: 'password',
//     avatar: './../public/images/Nelson.jpg',
// });
 
// userOne.save(function(err) {
//     if (err) throw err;
// });    