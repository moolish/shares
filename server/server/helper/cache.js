const LRUCache = require('lrucache');

const cache = LRUCache(100);

const set = cache.set,
    get = cache.get;

cache.set = function (key, val) {
    console.log('设置缓存 key: ', key);
    set.call(cache, key, val);
};

cache.get = function (key) {
    console.log('读取 key: ', key);
    return get.call(cache, key);
};

module.exports = cache;
