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

    DbService.prototype.deleteById = function (id) {
        filter = {'id': id};
        return dbApi.findOneAndDelete(this.dbSource, filter);
    },

    DbService.prototype.updateById = function (id) {
        filter = {'id': id};
        return dbApi.findOneAndUpdate(this.dbSource, filter);
    },

    DbService.prototype.save = function (doc) {
        return dbApi.insertOne(this.dbSource, doc);
    }
}

module.exports = DbService;