/**
 * Created by Administrator on 2016/7/13.
 */
var express = require('express');
var router = express.Router();
const utils = require('utility');
var uuid = require('node-uuid');

var dbService = require('../services/dbservice');
var Json = require('../lib/result');
var dbConfig = require('../config/db');

var profileService = new dbService(dbConfig.profile);
var userService = new dbService(dbConfig.user);

router.get('/get', function (req, res, next) {
    var user_id = req.session.user_id

    var q = {};
    if (user_id) {
        q.user_id = user_id;
    }

    try{
        profileService.getOne(q).then(function (result) {
            res.send(Json.success(result));
        })

    }catch (e) {
        res.send(Json.error(e));
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
            res.send(Json.error(err));
            return;
        }
        var doc = {}
        doc.user_id = req.session.user_id;
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
            profileService.updateByUserId(doc.user_id, doc).then(function (result) {
                userService.getById(doc.user_id).then(function (result) {
                    if(result.username !== req.body.profile.username){
                        if(req.body.profile.username){
                            var user = {}
                            user.username = req.body.profile.username;
                            userService.save(user).then(function (result) {
                                res.send(Json.success(doc));
                            })
                        }
                    }else{
                        res.send(Json.success(doc));
                    }
                })
            })
            
        }catch (e) {
            res.send(Json.error(e));
        }
    })
})

router.post('/modPass', function (req, res, next) {

    try{
        var user_id = req.session.user_id;
        var password = req.body.password;

        userService.getById(user_id).then(function (result) {
            var user = result;
            user.password = password;

            userService.updateById(user_id, user).then(function (result) {
                res.send(Json.success(result));
            })
        })
    }catch (e) {
        res.send(Json.error(e));
    }
})

module.exports = router;