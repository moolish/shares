const request = require('request');
const models = require('../server/models');

const jijinData = [];

const options = {
    url: `http://fund.eastmoney.com/Data/Fund_JJJZ_Data.aspx?t=1&lx=1&letter=&gsid=&text=&sort=zdf,desc&page=1,9999&feature=|&dt=${Date.now()}&atfc=&onlySale=0`,
    headers: {
        'User-Agent': 'request',
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        // 返回的body即是每天的数据
        eval(body);
        const now = new Date();
        const dateString = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
        if (db && db.datas) {
            db.datas.forEach(data => {
                jijinData.push({
                    code: data[0],
                    fundName: data[1],
                    dwjz: data[3],
                    ljjz: data[4],
                    date: dateString,
                });
            });
            Promise.all(jijinData.map(data => {
                models['Fund'].create(data);
            })).then(data => {
                console.log('Funds数据新增成功');
                return ;
            }).catch(err => {
                console.error('Funds数据新增失败', err);
                return ;
            });
        } else {
            console.log(error);
        }
    }
}

request(options, callback);
