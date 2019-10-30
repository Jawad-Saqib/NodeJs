var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var con = mysql.createPool({
  connectionLimit:10,
  host:'localhost',
  user:'root',
  password:"",
  database:'pub',
  debug:true
});
// 'mysql://root:@localhost:3306/pub');

/* GET users listing. */
router.get('/', function(req, res, next) {
  con.getConnection(function(err){
    if(err) throw err;
    else{
      var sql = 'SELECT * FROM points';
      con.query(sql, function(err, result){
        if(err) con.release();
        else{
          res.render('records', {data:result});
        }
      });
    }
  })
});
router.post('/', function(req, res, next) {
  con.getConnection(function(err){
    if(err) throw err;
    else{
      var n = req.body.name;
      var p = req.body.points;
      var sql = 'INSERT INTO points (name, points) VALUES("'+n+'",'+p+')';
      con.query(sql, function(err, result){
        if(err){
          con.release();
          console.log(err.message);
        }
        else{
          console.log("inserted");
          res.render('choice', { code:1 });
        }
      });
    }
  });
});
module.exports = router;