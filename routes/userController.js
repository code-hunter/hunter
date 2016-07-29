var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var dbService = require('../services/dbservice');
var Json = require('../lib/result');
var dbConfig = require('../config/db')

var service = new dbService(dbConfig.user);
var profileService = new dbService(dbConfig.profile);

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
  var doc = {}
  doc.id = uuid.v1();
  doc.username = req.body.username;
  doc.email = req.body.email;
  doc.password = req.body.password;

  var profile = {};
  profile.username = doc.username;
  profile.email = doc.email
  profile.user_id = doc.id;
  profile.id = uuid.v1();

  try{
    service.save(doc).then(function (result) {
      if(1 == result.insertedCount) {
        var user = result.ops[0];
        //set cookie
        res.cookie("userId", user.id);
        //set session

        profileService.save(profile).then(function (result) {
          req.session.regenerate(function(){
            req.session.user = user;
            req.session.user_id = user.id;
            req.session.save();
            res.send(Json.success());
          });
        })
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
      if(result && result.password == pwd){
        var user = result;
        res.cookie("userId", user.id);
        //set session
        req.session.regenerate(function(){
          req.session.user = user;
          req.session.user_id = user.id;
          req.session.save();
          res.send(Json.success());
        });
      }else {
        res.send(Json.error('用户不存在或密码错误'))
      }
    });
  }catch (e){
    console.log(e);
    res.send(Json.error(e));
  }
});

router.get("/logout", function (req, res, next) {
  res.clearCookie("login");
  res.clearCookie("userId");
  if(req.session.user){
    delete req.session.user;
  }
  if (req.session.user_id){
    delete req.session.user_id;
  }
  res.send(Json.success());
});

module.exports = router;