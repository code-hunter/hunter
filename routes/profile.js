/**
 * Created by Administrator on 2016/7/13.
 */
var express = require('express');
var utils = require('utility')
var uuid = require('node-uuid')
var router = express.Router();

var mongoclient = require('mongodb').MongoClient;
var config = require('../config/config')
var url = config.dbSource;

router.get('/get', function (req, res, next) {
    var user_id = req.session.user_id

    var q = {};
    if (user_id) {
        q.user_id = user_id;
    }

    try{
        mongoclient.connect(url, function (err, db) {

            if(err) throw err;
            var collection = db.collection('profile')
            collection.findOne(q, function (err, doc) {
                db.close();
                if(err){
                    res.send({'code': '0001', 'status':'fail'})
                }

                res.send({'code': '0000', 'status':'success', 'doc': doc});
            });
        })
    }catch (e) {
        throw e;
    }
})

router.post('/save', function (req, res, next) {
    var user_id = req.session.user_id;
    var id = uuid.v1();
    var username = req.body.username;
    var email = req.body.email;
    var qq = req.body.qq;
    var phone = req.body.phone;
    var detail = req.body.detail;

    var create_time = utils.YYYYMMDDHHmmss();

    var user_id = req.session.user_id;
    var id = uuid.v1();
    var create_time = utils.YYYYMMDDHHmmss();

    try{
        mongoclient.connect(url, function (err, db) {
            if(err) throw err;
            var collection = db.collection('profile');
            var doc = {'id': id, 'user_id': user_id, 'username': username, 'email': email, 'qq': qq, 'phone': phone, 'detail': detail, 'create_time':create_time}
            collection.insertOne(doc, function(err, result) {
                db.close();
                if(err){
                    console.log('failed to insert doc: ' + doc);
                    res.send({'code': '0001', 'status':'fail'})
                }

                res.send({'code': '0000', 'status':'success'})
            });
        })
    }catch (e) {
        throw e;
    }
})

module.exports = router;