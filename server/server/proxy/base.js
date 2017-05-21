const models = require('../models');

const _base = function (optsObj, cb) {
    models[optsObj.modelName][optsObj.fnName](optsObj.paramsObj).then((data) => {
        cb(null, data);
    }).catch(err => {
        console.warn(`BaseProxy.get:${optsObj.modelName}->${optsObj.fnName}(${optsObj.paramsObj}) - ${err}`);
    });
};

const get = function (modelName, queryObj, cb) {
    let paramsObj = {};
    // 处理fnName,判断是findOne还是findAll
    const fnName = queryObj.all || queryObj.random ? 'findAll' : 'findOne';
    delete queryObj.all;
    // 处理random
    if (queryObj.random) {
        paramsObj = _.merge({
            where: {},
            order: [
                [models.sequelize.fn('RAND')]
            ],
        }, queryObj);
    } else if (!queryObj.where) {
        // paramsObj为了方便，简化，多加一步判断,比如{pinyin: brandPinyin}
        // TODO 这里还能有优化空间
        paramsObj.where = queryObj;
    } else {
        paramsObj = queryObj;
    }

    const optsObj = {
        modelName,
        fnName,
        paramsObj,
    };

    _base(optsObj, cb);
};

exports = module.exports = {
    get
};
