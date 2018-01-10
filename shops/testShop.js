class testShop {
    constructor(sizes) {
        this.id = 0;
        this.homePage = 'testShop';
        this.shopConfig = require('./configs/testShop.json');
        this.sizes = sizes || this.shopConfig.sizes;
        this.steps = [];

        //1
        this.steps.push((browser) => {
            let sizeValue;
            browser
                .evaluate(() => {
                    return this;
                })
                .then((that) => {
                    console.log(that);
                    console.log(this);
                    return browser
                        .then(() => {
                            console.log(this);
                        })
                        .catch((error) => {
                            console.error(util.inspect(error));
                        });
                });
        });

        this.runSteps = (browser) => {
            this.steps.forEach((element, index) => {
                setTimeout(() => {
                    element(browser);
                }, index * this.shopConfig.pauseBetweenSteps);
            });
        };
    }
}

module.exports = testShop;