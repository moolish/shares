// 项目路由
const apiFun = require('./core/api');

module.exports = function (app) {
    // app.use('/', (req, res, next) => {
    //     if (req.isAuthenticated()) {
    //         return res.send('ok');
    //     }
    //     return res.render('login');
    // });

    // 设置跨域
    app.all('*', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
        return next();
    });
    app.get('/login', (req, res, next) => {
        return res.render('login');
    });

    app.post('/login', apiFun.login);

    app.post('/register', apiFun.register);
    app.get('/historyData', apiFun.historyData);

    // 开发环境，查看缓存
    app.get('/cache', (req, res) => {
        return res.send(require('./helper/cache').keys());
    });

};
