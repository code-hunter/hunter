/**
 * Created by zhouyu on 2016/7/24.
 */

var mongoClient = require('mongodb').MongoClient;
var Json = require('../result')

module.exports = {

    find : function(dbSource, query, options) {
        var dbName = dbSource.dbName;
        var dbCollection = dbSource.dbCollection;

        return new Promise(function (resolve, reject) {
            if (typeof(query) !== 'object'){
                reject(Json.error('query must be an object'));
            }else{
                mongoClient.connect(dbName, function(err, db){
                    if(err){
                        db.close();
                        reject(Json.error(err));
                    }else{
                        var collection = db.collection(dbCollection);
                        collection.find(query, options).toArray(function (err, docs) {
                            db.close();
                            if(err){
                                reject(Json.error(err));
                            }else{
                                resolve(Json.success(docs));
                            }
                        })
                    }
                })
            }
        })
    },

    findOne: function (dbSource, query, options) {
        var dbName = dbSource.dbName;
        var dbCollection = dbSource.dbCollection;

        return new Promise(function (resolve, reject) {
            if (typeof(query) !== 'object'){
                reject(Json.error('query must be an object'));
            }else{
                mongoClient.connect(dbName, function(err, db){
                    if(err){
                        db.close();
                        reject(Json.error(err));
                    }else{
                        var collection = db.collection(dbCollection);
                        collection.findOne(query, options).then(function (docs) {
                            db.close();
                            if(err){
                                reject(Json.error(err));
                            }else{
                                resolve(Json.success(docs));
                            }
                        })
                    }
                })
            }
        })
    },

    insertOne: function (dbSource, doc) {
        var dbName = dbSource.dbName;
        var dbCollection = dbSource.dbCollection;

        return new Promise(function (resolve, reject) {
            if (typeof(doc) !== 'object'){
                reject(Json.error('doc must be an object'));
            }else{
                mongoClient.connect(dbName, function(err, db){
                    if(err){
                        db.close();
                        reject(Json.error(err));
                    }else{
                        var collection = db.collection(dbCollection);
                        collection.insertOne(doc).then(function (result) {
                            db.close();
                            resolve(Json.success(result));
                        })
                    }
                })
            }
        })
    },

    insertMany: function (dbSource, docs) {
        var dbName = dbSource.dbName;
        var dbCollection = dbSource.dbCollection;

        return new Promise(function (resolve, reject) {
            if (typeof(docs) !== 'object'){
                reject(Json.error('doc must be an object'));
            }else{
                mongoClient.connect(dbName, function(err, db){
                    if(err){
                        db.close();
                        reject(Json.error(err));
                    }else{
                        var collection = db.collection(dbCollection);
                        collection.insertOne(docs).then(function (result) {
                            db.close();
                            resolve(Json.success(result));
                        })
                    }
                })
            }
        })
    },

    findOneAndUpdate: function(dbSource, filter, updateDoc, options) {
        var dbName = dbSource.dbName;
        var dbCollection = dbSource.dbCollection;
        var currentOptions;

        defaultOptions = {
            //Limits the fields to return for all matching documents.
            // 对匹配到的所有文档进行limit处理
            projection: null,
            //The maximum amount of time to allow the query to run.
            //最大查找时间
            maxTimeMS: null,
            //Determines which document the operation modifies if the query selects multiple documents.
            sort: null,
            //Upsert the document if it does not exist.
            // 如果文档不存在是否创建新文档
            upsert: true,
            //When false, returns the updated document rather than the original. The default is true.
            //如果设置为false，返回更新后的文档而不是旧的文档
            returnOriginal: false
        };

        var currentOptions = defaultOptions;

        if(options){
            currentOptions = options;
        }

        return new Promise(function (resolve, reject) {
            if (typeof(filter) !== 'object'){
                reject(Json.error('filter must be an object'));
            }else{
                mongoClient.connect(dbName, function(err, db){
                    if(err){
                        db.close();
                        reject(Json.error(err));
                    }else{
                        var collection = db.collection(dbCollection);
                        collection.findOneAndUpdate(filter, updateDoc, currentOptions).then(function (result) {
                            db.close();
                            resolve(Json.success(result));
                        })
                    }
                })
            }
        })
    },
    
    findOneAndDelete: function (dbSource, filter, options) {
        var dbName = dbSource.dbName;
        var dbCollection = dbSource.dbCollection;
        var currentOptions;

        defaultOptions = {
            //Limits the fields to return for all matching documents.
            // 对匹配到的所有文档进行limit处理
            projection: null,
            //The maximum amount of time to allow the query to run.
            //最大查找时间
            maxTimeMS: null,
            //Determines which document the operation modifies if the query selects multiple documents.
            sort: null
        };

        var currentOptions = defaultOptions;

        if(options){
            currentOptions = options;
        }

        return new Promise(function (resolve, reject) {
            if (typeof(filter) !== 'object'){
                resolve(Json.error('filter must be an object'));
            }else{
                mongoClient.connect(dbName, function(err, db){
                    if(err){
                        db.close();
                        resolve(Json.error(err));
                    }else{
                        var collection = db.collection(dbCollection);
                        collection.findOneAndDelete(filter, currentOptions).then(function (result) {
                            db.close();
                            resolve(Json.success(result));
                        })
                    }
                })
            }
        })
    },

    count: function (dbSource, filter, options) {
        var dbName = dbSource.dbName;
        var dbCollection = dbSource.dbCollection;
        var currentOptions;

        defaultOptions = {
            //Limits the fields to return for all matching documents.
            // 对匹配到的所有文档进行limit处理
            projection: null,
            //The maximum amount of time to allow the query to run.
            //最大查找时间
            maxTimeMS: null,
            //Determines which document the operation modifies if the query selects multiple documents.
            sort: null
        };

        var currentOptions = defaultOptions;

        if(options){
            currentOptions = options;
        }

        return new Promise(function (resolve, reject) {
            if (typeof(filter) !== 'object'){
                resolve(Json.error('filter must be an object'));
            }else{
                mongoClient.connect(dbName, function(err, db){
                    if(err){
                        db.close();
                        resolve(Json.error(err));
                    }else{
                        var collection = db.collection(dbCollection);
                        collection.count(filter, currentOptions).then(function (result) {
                            db.close();
                            resolve(Json.success(result));
                        })
                    }
                })
            }
        })
    }
}

