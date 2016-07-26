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

  if(key.charCodeAt("@")>0) {
    query.email = key;
  }else {
    query.username = key;
  }
  try{
    service.getOne(query).then(function (result) {
      res.send({status: "success", content: result.data != null});
    });
  }catch (e){
    console.log(e);
    res.send({status: "fail", msg: Json.error(e)});
  }

});

router.post("/register", function (req, res, next) {
  var username = req.body.username;
  var email = req.body.email;
  var pwd = req.body.password;

  try{
    var query = {};
    query.username = username;
    service.getOne(query).then(function (result) {
      if(result.data != null) {
        res.send({"status": "fail", "code": "0001"});
      }else {
        service.save({id: uuid.v1(), username: username, password: utils.md5(pwd)})
            .then(function (res) {
              if(1 == res.data.insertedCount) {
                var user = res.data.ops[0];
                //set cookie
                res.cookie("login", true);

                //set session
                req.session.regenerate(function(){
                  req.user = user;
                  req.session.userId = user.id;
                  req.session.save();

                  res.send({data: user.user_name, status: "success"});
                });
              }else{
                res.send({"status": "fail", "code": "0002"});
              }
            });
      }
    });
  }catch (e){
    console.log(e);
  }
});

/*
app.post("/re", function (req, res, next) {
  var user_name = req.body.user_name;
  var pwd = req.body.pwd;

  client.connect(url, function (err, db) {
    var collection = db.collection('users');

    collection.find({"user_name": user_name}).toArray(function (err, docs) {
      if(docs.length > 0) {
        res.send({"status": "fail", "code": "0001"});
      }else {
        collection.insertOne({id:uuid.v1(), user_name: user_name, pwd: utils.md5(pwd)}, function (err, r) {
          console.log("insert :"+r);
          if(1 == r.insertedCount) {
            var user = r.ops[0];
            //set cookie
            res.cookie("login", true);

            //set session
            req.session.regenerate(function(){
              req.user = user;
              req.session.userId = user.id;
              req.session.save();

              res.send({data: user.user_name, status: "success"});
            });
          }
        });
      }
    });
  })
});

app.post("/login", function (req, res, next) {
  var user_name = req.body.user_name;
  var pwd = req.body.pwd;

  client.connect(url, function (err, db) {
    var collection = db.collection('users');
    collection.find({"user_name": user_name}).toArray(function (err, docs) {
      if(docs.length == 0) {
        res.send({"status": "fail", "code": "0002"});
      }else {
        var user = docs[0];
        if(!utils.md5(pwd) == user.pwd){
          res.send({"status": "fail", "code": "0003"})
        }else{
          //set cookie
          res.cookie("login", true);

          //set session
          req.session.regenerate(function(){
            req.session.user = user;
            req.session.user_id = user.id;
            req.session.save();

            res.send({data: user.id, status: "success"});
          });
        }
      }
    });
  });
});

app.get("/logout", function (req, res, next) {
  res.clearCookie("login");
  delete res.session.user;
  delete res.session.user_id;
  res.send("/")
});
*/
module.exports = router;