var Nightmare = require('nightmare');
var util = require('util');

(function readArgs(){
    let a1 = process.argv[2];
    let a2 = process.argv[3];
    //TEST
    a1 = 'https://www.google.com/'
    //TEST
    openNightmare(a1, a2);
})();

function openNightmare(link, proxy){
    let checkoutNightmare = Nightmare({
        show: true,
        alwaysOnTop: false,
        switches:{
            'proxy-server': proxy ? `${proxy.host}:${proxy.port}` : null,
            'ignore-certificate-errors': false
        },
        title: proxy ? `${this.homePage} ${proxy.host}:${proxy.port}` : `${this.homePage}`,
        waitTimeout: 120000
    }).useragent(this.userAgent);

    if(proxy && proxy.login && proxy.password){
        checkoutNightmare.authentication(proxy.login, proxy.password);
    }

    checkoutNightmare.goto(link)
    .then(function (){

    }).catch(function (err){
        console.error(util.inspect(err));
    });
}