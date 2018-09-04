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
  if (!req.body.username && !req.body.email && !req.body.password && !req.body.passwordConf) 
    {res.send("Please fill in all the fields. Avatar is optional.");}
  
  else {
    var user = new User ({
      username :req.body.username,
      email : req.body.email,
      password :req.body.password,
      passwordConf: req.body.passwordConf,
      avatar : req.body.avatar,
    });
    
    user.save(function(err) {
      if (err) {
        res.send("Username or email exists. Try something else.");
      } else {
        function requiresReg(req, res, next) {
          if (req.session && req.session.userId) {
            return next();
          } else {
            var err = new Error('Failure to register to view your page.');
            err.status = 401;
            return next(err);
          }
        }
        router.get('/profile', requiresReg, function(req, res, next) {
        });
      }  
    });
  }  
});

router.post('/login', function (req, res) { 
  if (req.body.username == null || req.body.username == ' ' ||
  req.body.email == null || req.body.email == ' ' ||
  req.body.password == null || req.body.password == ' ')
    {res.send('Please enter your username and password to login.')}
  else {
    function requiresLogin(req, res, next) {
      if (req.session && req.session.userId) {
        return next();
      } else {
        var err = new Error('Failure to log into view your page.');
        err.status = 401;
        return next(err);
      }
    }
    router.get('/profile', requiresLogin, function(req, res, next) {
    });
  }  
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
module.exports = router;

