/**
 * Created by zhouyu on 2016/7/24.
 */

module.exports = {
    error: function (msg) {
        return {
            "code": -1,
            "msg": msg,
            'data': null
        }
    },

    success: function (data) {
        return {
            'code': 0,
            'msg' : '操作成功',
            'data': data
        }
    },

    noauth: function () {
        return {
            'code': -2,
            'msg': '请先登录',
            'data': null
        }
    }
}