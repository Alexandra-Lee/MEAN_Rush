var express = require('express');
var router = express.Router();
var User = require ('./../models/user');
var Words = require ('./../models/words');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
