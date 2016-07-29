/**
 * Created by zhouyu on 2016/7/24.
 */
var dbService = require('./dbservice')
var dbConfig = require('../config/db')


var query = {'user_id':'f1edc380-554e-11e6-bd98-6d71bdcee892'};
new dbService(dbConfig.profile).getOne(query).then(function (result) {
    console.log(result);
})



