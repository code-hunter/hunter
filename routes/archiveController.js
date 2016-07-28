/**
 * Created by Administrator on 2016/7/25.
 */
var express = require('express');
var utils = require('utility');
var uuid = require('node-uuid');
var router = express.Router();
var dbService = require('../services/dbservice');
var Json = require('../lib/result')

var dbConfig = require('../config/db');
var archiveService = new dbService(dbConfig.archive);

router.get('/getPage', function (req, res, next) {
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    var search_title = req.query.search_title
    var search_subject = req.query.search_subject

    try{
        var q = {};
        if (search_title) {
            var pattern = new RegExp("^.*"+search_title+".*$");
            q.title = pattern;
        }
        if(search_subject) {
            q.subject = search_subject;
        }
        
        var o = {};
        if(size){
            o.limit = size;
        }else{
            o.limit = 10;
        }
        
        if(page){
            o.skip = (page-1)*o.limit;
        }else{
            o.skip = 0;
        }

        archiveService.getPage(q, o).then(function(result){
            res.send(Json.success(result));
        })
    }catch (e) {
        console.log(e) ;
        res.send(Json.error(e));
    }
})


module.exports = router;