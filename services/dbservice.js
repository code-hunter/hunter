/**
 * Created by Administrator on 2016/7/25.
 */

var dbApi = require('../lib/db/api')

var DbService = function (dbSource) {

    this.dbSource = dbSource;

    DbService.prototype.getPage = function (query, option) {
        return dbApi.find(this.dbSource, query, option);
    },
        
    DbService.prototype.getById = function (id) {
        filter = {'id': id};
        return dbApi.findOne(this.dbSource, filter);
    },
        
    DbService.prototype.getOne = function (query) {
        return dbApi.findOne(this.dbSource, query);
    },

    DbService.prototype.getByUserId = function (user_id) {
        query = {'user_id': user_id};
        return dbApi.findOne(this.dbSource, query);
    },

    DbService.prototype.deleteById = function (id) {
        filter = {'id': id};
        return dbApi.findOneAndDelete(this.dbSource, filter);
    },

    DbService.prototype.updateById = function (id, newDoc) {
        filter = {'id': id};
        return dbApi.findOneAndUpdate(this.dbSource, filter, newDoc);
    },

    DbService.prototype.updateByUserId = function (user_id, newDoc) {
        filter = {'user_id': user_id};
        return dbApi.findOneAndUpdate(this.dbSource, filter, newDoc);
    },

    DbService.prototype.save = function (doc) {
        return dbApi.insertOne(this.dbSource, doc);
    }, 
    
    DbService.prototype.count = function (query) {
        return dbApi.count(this.dbSource, query);
    },
        
    DbService.prototype.deleteMany = function (filter) {
        return dbApi.deleteMany(this.dbSource, filter);
    }
}

module.exports = DbService;