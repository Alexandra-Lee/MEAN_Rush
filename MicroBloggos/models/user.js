var mongoose = require('mongoose');
//console.log ("just a test");
var UserSchema = new mongoose.Schema ({
    username: {type: String, lowercase: true, required: true, unique: true, validate: {
        validator: function(valid) {
            return /^[a-zA-Z_]+/.test(valid);
        },
        message: 'Your username must begin with a letter A-Z and be at least 5 characters.'
    }},
    email: {type: String, lowercase: true, required: true, unique: true, match:[/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/ , "Email format not valid"]},
    password: {type: String, lowercase: true, required: true},
    avatar: {type: Buffer, default: null},
    created: {type: Date, }
});
 
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