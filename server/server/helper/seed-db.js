const lineReader = require('line-reader');
const BaseProxy = require('../proxy/base');
const models = require('../models');

const testData = function() {
    Promise.all([
        BaseProxy.get('User', {}, (err, users) => {
            if (err) {
                console.log(err);
                return;
            }
            if (users) {
                return;
            }
            console.log('数据库user表无数据，创建测试用户');
            models['User'].create({
                username: 'test',
                password: '123456',
                shareId: '600129',
            }).then(data => {
                console.log('创建test用户成功');
                return ;
            }).catch(err => {
                console.error('创建失败', err);
                return ;
            });
        })
        ,
        BaseProxy.get('Share', {}, (err, data) => {
            if (err) {
                console.error(err);
            }
            if (data) {
                return;
            }
            let shares = [];
            try {
                data = require('./shareData.json');
                shares = data.map(ele => {
                    return JSON.parse(ele);
                });
            } catch (err) {
                console.error(err);
            }
            Promise.all(shares.map(share => {
                models['Share'].create(share);
            })).then(data => {
                console.log('shares数据初始化完成');
                return ;
            }).catch(err => {
                console.error('shares数据初始化失败', err);
                return ;
            });
        })
    ]).then(data => {
        console.log('数据初始化完成');
    }).catch(err => {
        console.error('数据初始化失败', err);
    });
};

module.exports = testData;
