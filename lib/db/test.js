/**
 * Created by zhouyu on 2016/7/24.
 */

dbApi = require('./api.js');

var dbSource = {
    dbName: 'mongodb://localhost:27017/hunter',
    dbCollection: 'profile'
}
var query = {'user_id':'f1edc380-554e-11e6-bd98-6d71bdcee892'};
var options = {
    // limit : 10,
    // skip : 0,
    // sort: {'_id': -1}
}

dbApi.findOne(dbSource, query).then(function (result) {
    cosole.log('');
})