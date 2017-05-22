const config = require('config');

const BaseProxy = require('../proxy/base');
const models = require('../models');
const request = require('../helper/api');

// 用户登录
const login = function (req, res, next) {
    const { username, password } = req.body;
    BaseProxy.get('User', { username }, function(err, user) {
        if (err) {
            return res.json({
                code: 2,
                msg: err.message
            });
        }
        if (!user) {
            return res.json({
                code: 0,
                msg: '用户不存在',
            });
        }
        if ( user.password !== password ) {
            return res.json({
                code: 0,
                msg: '密码错误',
            });
        }
        return res.json({
            code: 0,
            msg: '登录成功',
            data: {
                username: user.username,
                shareId: user.shareId
            }
        });
    });
};

// 用户注册
const register = function (req, res, next) {
    const { username, password } = req.body;
    BaseProxy.get('User', { username }, (err, user) => {
        if (err) {
            console.log(err);
            return res.json({
                code: 2,
                msg: err.message
            });
        }
        if (user) {
            return res.json({
                code: 1,
                msg: '用户名已存在',
            });
        }
        models['User'].create({
            username,
            password,
            shareId: '',
        }).then(user => {
            return res.json({
                code: 0,
                msg: '注册成功',
                data: user,
            })
        }).catch(err => {
            console.error('创建失败', err);
            return res.json({
                code: 2,
                msg: err.message
            });
        });
    });
};

const historyData = function (req, res, next) {
    const { code, start, end, username, shareId } = req.query; // eg: code=cn_300228
    if (!code || !start || !end) {
        return res.json({
            code: 1,
            msg: '参数错误，请检查code, start, end参数是否正确！',
        });
    }
    const options = {
        url: `${config.server.historyUrl}&code=${code}&start=${start}&end=${end}`,
        enableCache: false,
    };
    request.get(options, (err, response, json) => {
        // 更新数据库中 shareId
        console.log(username);
        if (username) {
            models['User'].update({
                shareId: `${shareId}-${code.split('_')[1] || code}`
            }, {
                where: { username: username }
            }).then(user => {
                console.log(username, '更新shareId');
            }).catch(err => {
                console.error(username,'更新查询记录失败', err);
            });
        }

        if (err) {
            return res.json({
                code: 2,
                msg: err.message,
            });
        }
        return res.json({
            code: 0,
            msg: 'ok',
            data: json,
        });
    });

};

module.exports = {
    login,
    register,
    historyData
};
