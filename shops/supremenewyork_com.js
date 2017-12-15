class supremenewyork_com{
    constructor(){
        this.id = 6026;
        this.homePage = "supremenewyork.com";
        this.shopConfig = require('./configs/supremenewyork_comConfig.json');

        this.checkout = function (browser) {
            browser.click('input[class=button commit]');
        }
    }
}

module.exports = supremenewyork_com;