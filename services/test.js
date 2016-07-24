/**
 * Created by zhouyu on 2016/7/24.
 */

var archiveService = require('./archive')

query = {};

archiveService.getPage(query).then(function(result){
    console.log(result);
})

