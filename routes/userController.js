var express = require('express');
var router = express.Router();
const utils = require('utility');
var uuid = require('node-uuid');
var dbService = require('../services/dbservice');
var Json = require('../lib/result');
var dbConfig = require('../config/db')

var service = new dbService(dbConfig.user);

router.get("/check", function (req, res, next) {
  var key = req.query.key;
  var query = {};

  if(key.indexOf("@") != -1) {
    query.email = key;
  }else {
    query.username = key;
  }
  try{
    service.getOne(query).then(function (result) {
      res.send(Json.success(result != null));
    });
  }catch (e){
    console.log(e);
    res.send(Json.error(e));
  }

});

router.post("/register", function (req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var pwd = req.body.password;

  try{
    service.save(
        {
          id: uuid.v1(),
          username: username,
          password: utils.md5(pwd),
          email: email
        }
    ).then(function (result) {
      if(1 == result.insertedCount) {
        var user = result.ops[0];
        //set cookie
        res.cookie("userId", user.id);
        //set session
        req.session.regenerate(function(){
          req.user = user;
          req.session.userId = user.id;
          req.session.save();
          res.send(Json.success());
        });
      }else{
        res.send(Json.error());
      }
    });
  }catch (e){
    console.log(e);
    res.send(Json.error());
  }
});


router.post("/login", function (req, res, next) {
  var username = req.body.username;
  var pwd = req.body.password;

  try{
    service.getOne({username: username}).then(function (result) {
        res.send(Json.success(result && result.password == utils.md5(pwd)));
    });
  }catch (e){
    console.log(e);
    res.send(Json.error(e));
  }
});
router.get("/logout", function (req, res, next) {
  res.clearCookie("login");
  delete res.session.user;
  delete res.session.user_id;
  res.send("/")
});
module.exports = router;