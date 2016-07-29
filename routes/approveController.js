/**
 * Created by Administrator on 2016/7/25.
 */
var express = require('express');
var utils = require('utility');
var uuid = require('node-uuid');
var router = express.Router();
var dbService = require('../services/dbservice');
var Json = require('../lib/result');

var dbConfig = require('../config/db');
var approveService = new dbService(dbConfig.approve)
var archiveService = new dbService(dbConfig.archive)

router.get('/getPage', function (req, res, next) {
    try{
        var user_id = req.session.user_id
        var page = parseInt(req.query.page);
        var size = parseInt(req.query.size);

        var q = {};
        if (user_id) {
            q.user_id = user_id;
        }

        var s={'_id': 1};
        
        var o = {};
        if(size){
            o.limit = size;
        }else{
            o.limit = 10;
        }
        
        if(page){
            o.skip = (page)*o.limit;
        }else{
            o.skip = 0;
        }
        
        result = {};
        approveService.count(q).then(function (ret) {
            result.total = ret;
            approveService.getPage(q, o).then(function(ret){
                result.docs = ret;
                res.send(Json.success(result));
            })
        })

    }catch (e) {
        console.log(e) ;
        res.send(Json.error(e));
    }
})

router.post('/save', function (req, res, next) {

    doc = {};
    doc.id = uuid.v1();
    doc.user_id = req.session.user_id;
    doc.archive_id = req.body.archive_id;
    doc.create_time = utils.YYYYMMDDHHmmss();

    try{

        q = {};
        q.id = doc.archive_id;
        archiveService.getOne(q).then(function (ret) {
            doc.title = ret.title;
            doc.url = ret.url;
            doc.author = ret.author;
            doc.published_time = ret.published_time;

            approveService.save(doc).then(function (ret) {
                res.send(Json.success(ret));
            })
        })
    }catch (e) {
        console.log(e) ;
        res.send(Json.error(e));
    }
})


router.post('/delete', function (req, res, next) {

    var ids = req.body.ids;
    var idList = ids.split(',');
    
    try{
        q = {}
        q.id = {"$in": idList}

        approveService.deleteMany(q).then(function (ret) {
            res.send(Json.success(ret));
        })
        
    }catch (e) {
        console.log(e) ;
        res.send(Json.error(e));
    }
})

module.exports = router;