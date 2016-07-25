/**
 * Created by zhouyu on 2016/7/24.
 */
var dbService = require('./dbservice')
var dbConfig = require('../config/db')

new dbService(dbConfig.archive).getPage({'id':1},{})


