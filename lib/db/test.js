/**
 * Created by zhouyu on 2016/7/24.
 */

dbApi = require('./api.js');

var dbSource = {
    dbName: 'mongodb://localhost:27017/hunter',
    dbCollection: 'profile'
}
<<<<<<< HEAD
var query = {'user_id':'111'}
=======
var query = {'name':'baidu'}
>>>>>>> 83e802c6421144ff21b08f28c37b9bd868a30b7d
var options = {
    // limit : 10,
    // skip : 0,
    // sort: {'_id': -1}
}
//
// dbApi.find(dbSource, query, options).then(function (result) {
//     console.log(result);
// })

dbApi.findOne(dbSource, query, options).then(function (result) {
    console.log(result);
})

// var doc = {'name': 'sohu', 'url': 'http://www.sohu.com'}

// dbApi.insertOne(dbSource, doc).then(function (result) {
//     console.log(result);
// })
//
// dbApi.findOneAndUpdate(dbSource, query, doc).then(function (result) {
//     console.log(result);
// })

<<<<<<< HEAD
// dbApi.findOneAndDelete(dbSource, query).then(function (result) {
//     console.log(result);
// })
=======
dbApi.count(dbSource, query).then(function (result) {
    console.log(result);
})
>>>>>>> 83e802c6421144ff21b08f28c37b9bd868a30b7d
