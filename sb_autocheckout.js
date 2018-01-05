const Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);
const _ = require('lodash');
const util = require('util');
const config = require('./config.json');

const __shops = require('./__shops.js');

function cookieTransform(cookies) {
    var updated = [];
    _.each(cookies, function (cookie) {
        var url = '';
        if (cookie.secure) {
            url += 'https://';
        } else {
            url += 'http://';
        }

        if (cookie.domain.startsWith('.')) {
            url += 'www';
        }

        url += cookie.domain;

        updated.push(_.assign({
            url: url
        }, _.omit(cookie, 'domain')))
    });

    return updated;
}

Nightmare.action('clearCache',
    function (name, options, parent, win, renderer, done) {
        parent.respondTo('clearCache', function (done) {
            win.webContents.session.clearCache(done);
            done();

        });
        done();
    },
    function (done) {
        this.child.call('clearCache', done);
    });

Array.prototype._diff = function (arr2) {
    for (let i in this) {
        if (arr2.indexOf(this[i].text) > -1)
            return this[i].value;
    }
};

(() => {
    let args = process.argv.splice(2);

    let shopId = null;
    let link = null;
    let proxy = config.proxy;
    let sizes = null;
    switch (args.length) {
        case 2:
            shopId = args[0];
            link = args[1];
            break;
        case 3:
            shopId = args[0];
            link = args[1];
            if (args[2])
                proxy = args[2];
            break;
        case 4:
            shopId = args[0];
            link = args[1];
            if (args[2])
                proxy = args[2];
            sizes = args[3];
            break;
    }

    shopId = 1003;
    link = 'https://kith.com/products/kith-ainodake-parka-cheetah';
    openBrowser(shopId, link, proxy, sizes);
})();

function openBrowser(shopId, link, proxy, sizes) {
    let checkoutBrowser = Nightmare({
            show: true,
            alwaysOnTop: false,
            switches: proxy ? {
                'proxy-server': proxy.hostPort,
                'ignore-certificate-errors': false
            } : {},
            webPreferences: {
                webSecurity: false
            }
        }).useragent(config.userAgent)
        .cookies.clearAll()
        .clearCache()
        .cookies.set(cookieTransform(config.gCookies));

    let shop = new __shops(sizes).getShop(shopId);

    setTimeout(function () {
        checkoutBrowser
            .authentication(proxy ? proxy.login : null, proxy ? proxy.password : null)
            .goto(link)
            .then(function () {
                shop.runSteps.call(shop, checkoutBrowser);
            }).catch(function (error) {
                console.error(util.inspect(error));
                checkoutBrowser.end();
            });
    }, 1000);
}