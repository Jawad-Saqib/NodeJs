var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res, next) {
  console.log("post request");
  var ch = req.body.choice;
  if(ch == "points"){
      res.render('table', { title:'Points Table' });
  }
  else{
      res.render('url', { title:'Youtube URL' });
  }
});

module.exports = router;
