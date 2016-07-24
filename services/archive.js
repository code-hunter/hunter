/**
 * Created by zhouyu on 2016/7/24.
 */

var dbApi = require('../lib/db/api')
var dbConfig = require('../config/db')

var archiveSource = dbConfig.archive

module.exports = {
    getPage: function (query, option) {
        return dbApi.find(archiveSource, query, option);
    },

    getById: function (id) {
        filter = {'id': id};
        return dbApi.findOne(archiveSource, filter);
    },

    deleteById: function (id) {
        filter = {'id': id};
        return dbApi.findOneAndDelete(archiveSource, filter);
    },

    updateById: function (id) {
        filter = {'id': id};
        return dbApi.findOneAndUpdate(archiveSource, filter);
    },

    save: function (doc) {
        return dbApi.insertOne(archiveSource, doc);
    }

}
