/**
 * Created by Administrator on 2016/7/13.
 */
var express = require('express');
var utils = require('utility');
var uuid = require('node-uuid');
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

var path = require('path');
var fs = require('fs');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        dstPath = path.join(path.join(__dirname, '../public/uploads/'))
        if(!fs.existsSync(dstPath)){//不存在就创建一个
            fs.mkdirSync(dstPath, 0755)
        }
        cb(null, dstPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
var upload = multer({ storage: storage }).any();

router.post('/save', function (req, res, next) {

    upload(req,res,function(err){
        if(err){
            res.json({success:false,msg:'Some error'});
            return;
        }
        var doc = {}
        doc.user_id = req.session.user_id;
        doc.id = uuid.v1();
        doc.create_time = utils.YYYYMMDDHHmmss();
        
        if(req.files.length > 0) {
            var file = req.files[0];
            doc.image_name = file.filename;
            doc.image_url = '/uploads/' + file.filename; 
            doc.image_path = file.path;
        }

        if(req.body.profile.username){
            doc.username = req.body.profile.username;
        }
        if(req.body.profile.email){
            doc.email = req.body.profile.email;
        }
        if(req.body.profile.nickname){
            doc.nickname = req.body.profile.nickname;
        }
        if(req.body.profile.phone){
            doc.phone = req.body.profile.phone;
        }
        if(req.body.profile.password){
            doc.password = utils.md5(req.body.profile.password);
        }

        try{
            mongoclient.connect(url, function (err, db) {
                if(err) throw err;
                var collection = db.collection('profile');
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

        res.json({success:true,msg:'Image uploaded successfully'});
    })
})

module.exports = router;