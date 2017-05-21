const BaseProxy = require('../proxy/base');
const models = require('../models');

const testData = function() {
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
        }).catch(err => {
            console.error('创建失败', err);
        });
    });
};

module.exports = testData;
