/**
 * Created by zhouyu on 2016/7/24.
 */

var config = require('./config')

const db = {

    'archive': {
        'dbName': config.dbSource,
        'dbCollection': 'archive'
    },

    'profile': {
        'dbName': config.dbSource,
        'dbCollection': 'profile',
    },

    'favorite': {
        'dbName': config.dbSource,
        'dbCollection': 'favorite'
    },

    'user': {
        'dbName': config.dbSource,
        'dbCollection': 'user'
    }
}

module.exports = {
    archive: db.archive,
    profile: db.profile,
    favorite: db.favorite,
    user: db.user
}