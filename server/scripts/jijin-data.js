const request = require('request');
const csv = require('csv');
const fs = require('fs');
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
            csv.stringify(jijinData, { header: true, }, function (err, data) {
                if (err) {
                    console.error(`生成csv文件失败！${err}`);
                } else {
                    try {
                        const now = new Date();
                        const yearmonthday = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
                        // fs.writeFileSync(`${__dirname}/../data/jijin-data_${yearmonthday}.csv`, data);
                        const outputFile = fs.createWriteStream(`${__dirname}/../data/jijin-data_${yearmonthday}.csv`);

                        outputFile.write(data, 'UTF-8');

                        outputFile.on("open", function(fd) {
                            console.log("开始写入文件. . . \n");
                        });
                        outputFile.end("the end", function() {
                            console.log("文件写入完毕! \n");
                            process.exit(0);
                        });

                    } catch (error) {
                        console.error(`文件写入失败${error}`);
                        process.exit(1);
                    }
                }
            });
        } else {
            console.log(error);
            process.exit(1);
        }
    }
}

request(options, callback);
