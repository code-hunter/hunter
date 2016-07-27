/**
 * Created by zhouyu on 2016/7/24.
 */

dbApi = require('./api.js');

var dbSource = {
    dbName: 'mongodb://localhost:27017/hunter',
    dbCollection: 'archive'
}
var query = {'name':'baidu'}
var options = {
    // limit : 10,
    // skip : 0,
    // sort: {'_id': -1}
}
//
// dbApi.find(dbSource, query, options).then(function (result) {
//     console.log(result);
// })

// dbApi.findOne(dbSource, query, options).then(function (result) {
//     console.log(result);
// })

// var doc = {'name': 'sohu', 'url': 'http://www.sohu.com'}

// dbApi.insertOne(dbSource, doc).then(function (result) {
//     console.log(result);
// })
//
// dbApi.findOneAndUpdate(dbSource, query, doc).then(function (result) {
//     console.log(result);
// })

dbApi.count(dbSource, query).then(function (result) {
    console.log(result);
})