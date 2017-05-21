'use strict';

const request = require('request');
const config = require('config');
const md5 = require('md5');
const lrucache = require('./cache');

// default options
const defaultOpts = {
    timeout: config.server.timeout,
    enableCache: config.cache.enable || false,
};

module.exports = {
    post: function (opts, done) {
        const options = this._mergeOptions(opts, done);
        if (!options) {
            const jsonOpts = JSON.stringify(opts);
            return done(new Error('api.post:_mergeOptions failed: %s', jsonOpts)); // eslint-disable-line
        }

        options.method = 'post';
        options.enableCache = false;

        this._doRequest(options, done);
    },

    get: function (opts, done) {
        const options = this._mergeOptions(opts, done);
        if (!options) {
            const jsonOpts = JSON.stringify(opts);
            return done(new Error('api.get:_mergeOptions failed: %s', jsonOpts)); // eslint-disable-line
        }

        if (options.enableCache) {
            const val = lrucache.get(options.cacheKey);
            if (val) {
                return done(null, null, val);
            }
            options.method = 'get';
            this._doRequest(options, done);
        } else {
            options.method = 'get';
            this._doRequest(options, done);
        }
    },

    _doRequest: function (options, done) {
        request(options, function (err, response, body) {
            body = (body || '{}').trim();

            // Error
            if (err) {
                return done(err.code === 'ETIMEDOUT' ? new Error('服务超时') : err, null); // eslint-disable-line
            }

            // JSON parse
            let json = {};
            try {
                json = JSON.parse(body);
            } catch (e) {
                return done(new Error('服务响应错误'), null);
            }

            // if setting in cache
            if (options.enableCache) {
                lrucache.set(options.cacheKey, json);
            }

            // callback, body after JSON parse
            done(null, response, json);
        });
    },

    _mergeOptions(opts, callback) {
        if (!opts && !callback) {
            return null;
        }

        const options = {};
        if (typeof opts === 'object') {
            Object.keys(opts).forEach((key) => {
                options[key] = opts[key];
            });
        } else {
            options.url = opts.toString();
        }

        // validate
        if (!options.url) {
            callback(new Error('api._mergeOptions: url is required'));
            return null;
        }

        // merge default options
        Object.keys(defaultOpts).forEach((key) => {
            if (typeof options[key] === 'undefined') {
                options[key] = defaultOpts[key];
            }
        });

        // encode url
        options.url = encodeURI(options.url);
        options.label = options.label || options.url;

        // cache key
        if (options.enableCache) {
            options.cacheKey = md5(options.url);
        }

        return options;
    }

};
