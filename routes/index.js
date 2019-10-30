var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Admin Login' });
});
router.post('/', function(req, res, next) {
  console.log("post request");
  var un = req.body.username;
  var pass = req.body.password;
  if(un == "Tony" && pass == "tony1234"){
    console.log(un);
    console.log(pass);
    res.render('choice', { title: 'Pub' });
  }
  else{
    res.send("Invalid Credentials");
  }
});

module.exports = router;
