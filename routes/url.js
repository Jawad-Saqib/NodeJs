var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var con = mysql.createPool({
  connectionLimit:10,
  host:'localhost',
  user:'root',
  password:"",
  database:'pub'
});
// ('mysql://root:@localhost:3306/pub');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('videourl', { title:'Youtube Video' });
});
router.post('/', function(req, res, next) {
  con.getConnection(function(err){
    if(err){
      // res.send("Not Connected");
      throw err;
    }
    else{
      var u = req.body.url;
      var sql = 'SELECT * FROM youtubeurl';
      con.query(sql, function(err, result, fields){
        if(err){
          con.release();
          console.log(err.message);
        }
        else{
          // console.log(fields);
          console.log(result.length);
          if(result.length == 1){
            sql = 'UPDATE youtubeurl set url = "'+u+'" WHERE id=1';
            con.query(sql, function(err, result, fields){
              if(err){
                // con.release();
                console.log(err.message);
              }
            });
          }
          else{
            var sql = 'INSERT INTO youtubeurl(url) VALUES("'+u+'")';
            con.query(sql, function(err, result, fields){
              if(err){
                // con.release();
                console.log(err.message);
              }
            });
          }
          console.log("inserted");
        }
      });
      res.render("choice", { code:1 });
    }
  });
});
module.exports = router;