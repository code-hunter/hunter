var everyauth = require('../everyauth/index');
var conf = require('./conf');

// open debug mode
everyauth.debug = true;

var usersById = {};
var nextUserId = 0;

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.uid = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

var usersByQQId = {};
var usersByWeiboId = {};
var usersByWeiboId = {};
var usersByGithubId = {};
var usersByBaiduId = {};
var usersByDoubanId = {};
var usersByRenrenId = {};
var usersByTqqId = {};
var usersByTaobaoId = {};
var usersByLogin = {
  'demo@example.com': addUser({ login: 'demo@example.com', password: 'pass'})
};

everyauth.everymodule
  // use `uid` instead of the default `id` as user authentication.
  .userPkey('uid')
  // use userid to query userinfo from db in real projects.
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });

everyauth
  .qq
    .myHostname('http://www.codehunter.cn')
    .appId(conf.qq.appId)
    .appSecret(conf.qq.appKey)
    .findOrCreateUser( function (session, accessToken, accessTokenExtra, qqUserMetadata) {
      return usersByQQId[qqUserMetadata.openid] ||
        (usersByQQId[qqUserMetadata.openid] = addUser('qq', qqUserMetadata));
    })
    .redirectPath('/');

everyauth
  .weibo
    .myHostname('http://www.codehunter.cn')
    .appId(conf.weibo.appKey)
    .appSecret(conf.weibo.appSecret)
    .findOrCreateUser( function (session, accessToken, accessTokenExtra, weiboUserMetadata) {
      return usersByWeiboId[weiboUserMetadata.uid] ||
        (usersByWeiboId[weiboUserMetadata.uid] = addUser('weibo', weiboUserMetadata));
    })
    .redirectPath('/');

everyauth
    .github
    .myHostname('http://www.codehunter.cn')
    .appId(conf.github.appKey)
    .appSecret(conf.github.appSecret)
    .findOrCreateUser( function (session, accessToken, accessTokenExtra, taobaoUserMetadata) {
        var res = githubUserMetadata['user_' + this._role + '_get_response'];
        var tbId = res ? res.user.user_id : 'error_response';
        return usersByGithubId[tbId] ||
            (usersByGithubId[tbId] = addUser('github', githubUserMetadata));
    })
    .redirectPath('/');

