module.exports = {
    db: 'mysql:root:123456@localhost:3306/shares',
    dbLoggin: console.log,
    port: 3000,
    server: {
        historyUrl: 'http://q.stock.sohu.com/hisHq?stat=1&order=D&period=d&rt=json',
        timeout: 5000,
    },
    cache: {
        // enable: true,
        maxAge: 60 * 60 * 24,
        newsAge: 60 * 60, // 一个小时
    },
}
