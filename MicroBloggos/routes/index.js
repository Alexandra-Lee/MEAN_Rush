var express = require('express');
var router = express.Router();
var User = require ('./../models/user');

var Words = require ('./../models/words');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Mini Mighty Micro Blog' });
});

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define the other routes
router.get('/users', function (req, res) {
  res.send('All users');
})

router.get('/users/:id(\\d+)/', function (req, res) {
  res.send('About the user: ' + req.params.id);
})

router.get('/words/:id(\\d+)/', function (req, res) {
  res.send('All the words of user: ' + req.params.id);
})

router.get('/words', function (req, res) {
  res.send('All the little words');
})

/* The Words */
router.post('/words', function (req, res) {
  var word = new Words ({
  user :req.body.username,
  theWords : req.body.email,
  });
  word.save();
  res.send('new words published');
});

/* Authentication */
router.post('/register', function (req, res) {
  var user = new User ({
  username :req.body.username,
  email : req.body.email,
  password :req.body.password,
  avatar : req.body.avatar,
  });

  if (req.body.username == null || req.body.username == ' ' 
  || req.body.email == null || req.body.email == ' '
  || req.body.password == null || req.body.password == ' ') 
    {res.send("Please fill in all the fields. Avatar is optional.");}
  else {
    user.save(function(err) {
      if (err) {
        res.send("Username or email exists. Try something else.");
      } else {
        res.send('new user added');
      }  
    });
  }  
});

router.post('/login', function (req, res) {

  res.send('User logged in.');
});
module.exports = router;
