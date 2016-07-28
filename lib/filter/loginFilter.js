/**
 * Created by Administrator on 2016/7/27.
 */

var config = require('../../config/config')
var Json = require('../result')

module.exports = {
    loginFilter : function (req, res, next) {

        var url = req.originalUrl;
        var authUrls = config.authUrls;
        var found = false;

        authUrls.forEach(function (item) {
            if(item === url){
                found = true;
            }
        })

        if(found && !req.session.user){
           return res.send(Json.noauth());
        }
        
        next();
    }
}
