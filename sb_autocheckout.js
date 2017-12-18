const Nightmare = require('nightmare');
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

(function readArgs(){
    let args = process.argv.splice(2);

    let shopId = null;
    let link = null;
    let proxy = null;
    switch(args.length){
        case 0:{
            link = 'https://duckduckgo.com';
            //link = 'http://www.supremenewyork.com/shop/t-shirts/bikdwcmzj';
            //proxy = { hostPort: '87.98.136.3:12345', login: 'douma', password: 'douma' };
        }break;
        case 1:{
            link = args[0];
        }break;
        case 2:{
            link = args[0];
            proxy = args[1];
        }break;
        case 3:{
            shopId = args[0];
            link = args[1];
            proxy = args[2];
        }break;
    }

    openBrowser(shopId, link, proxy);
})();

function openBrowser(shopId, link, proxy){
    let checkoutBrowser = Nightmare({
            show: true,
            alwaysOnTop: false,
            switches: proxy ? {
                'proxy-server': proxy.hostPort,
                'ignore-certificate-errors': false
            } : { }
        }).useragent(config.userAgent)
        .cookies.clearAll()
        .clearCache()
        .cookies.set(cookieTransform(config.gCookies));

        let shop = new __shops().getShop(6026);

    setTimeout(function () {
        checkoutBrowser
            .authentication(proxy ? proxy.login : null, proxy ? proxy.password : null)
            .goto(link)
            .then(function () {
                shop.runSteps(shop, checkoutBrowser);
            }).catch(function (error) {
                console.error('an error has occurred: ' + error);
                console.error(util.inspect(error));
                checkoutBrowser.end();
            });
    }, 1000);
}