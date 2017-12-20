class kith_com {
    constructor(size) {
        this.id = 1003;
        this.homePage = 'kith.com';
        this.shopConfig = require('./configs/kith_com.json');
        this.size = size || this.shopConfig.size;
        this.steps = [];

        //1
        this.steps.push(function (self, browser) {
            browser
                .insert('#checkout_email', self.shopConfig.customerInformation.email)
                .insert('#checkout_shipping_address_first_name', self.shopConfig.customerInformation.firstName)
                .insert('#checkout_shipping_address_last_name', self.shopConfig.customerInformation.lastName)
                .insert('#checkout_shipping_address_address1', self.shopConfig.customerInformation.address1)
                .insert('#checkout_shipping_address_address2', self.shopConfig.customerInformation.address2)
                .insert('#checkout_shipping_address_city', self.shopConfig.customerInformation.city)
                .select('#checkout_shipping_address_country', self.shopConfig.customerInformation.country)
                .select('#checkout_shipping_address_province', self.shopConfig.customerInformation.province)
                .insert('#checkout_shipping_address_zip', self.shopConfig.customerInformation.zip)
                .insert('#checkout_shipping_address_phone', self.shopConfig.customerInformation.phone)
                .click('.step__footer__continue-btn.btn')
                .catch(function (error) {
                    console.error(util.inspect(error));
                });
        });

        //2
        this.steps.push(function (self, browser) {
            browser
                .click('.step__footer__continue-btn.btn')
                .catch(function (error) {
                    console.error(util.inspect(error));
                });
        });

        //3
        this.steps.push(function (self, browser) {
            switch (self.shopConfig.customerInformation.paymentMethod) {
                case 1:
                    browser
                        .enterIFrame('iframe[id^="card-fields-number-"]')
                        .insert('#number', self.shopConfig.customerInformation.card.cardNumber)
                        .exitIFrame()
                        .enterIFrame('iframe[id^="card-fields-name-"]')
                        .insert('#name', self.shopConfig.customerInformation.card.nameOnCard)
                        .exitIFrame()
                        .enterIFrame('iframe[id^="card-fields-expiry-"]')
                        .insert('#expiry', self.shopConfig.customerInformation.card.mmYY)
                        .exitIFrame()
                        .enterIFrame('iframe[id^="card-fields-verification_value-"]')
                        .insert('#verification_value', self.shopConfig.customerInformation.card.cvv)
                        .exitIFrame()
                        .click('.step__footer__continue-btn.btn ')
                        .catch(function (error) {
                            console.error(util.inspect(error));
                        });
                    break;
                case 2:
                    browser
                        .check('#checkout_payment_gateway_3700574')
                        .click('.step__footer__continue-btn.btn')
                        .catch(function (error) {
                            console.error(util.inspect(error));
                        });
                    break;
                default:
                    console.error('Incorrect or not selected "paymentMethod"');
            }
        });

        if (this.shopConfig.customerInformation.paymentMethod === 2) {
            //4
            this.steps.push(function (self, browser) {
                browser
                    .insert('#email', '')
                    .insert('#email', self.shopConfig.customerInformation.payPal.email)
                    .insert('#password', self.shopConfig.customerInformation.payPal.password)
                    .click('#btnLogin')
                    .catch(function (error) {
                        console.error(util.inspect(error));
                    });
            });

            //5
            this.steps.push(function (self, browser) {
                browser
                    .click('#confirmButtonTop')
                    .catch(function (error) {
                        console.error(util.inspect(error));
                    });
            });
        }

        this.runSteps = function (self, browser) {
            this.steps.forEach(function (element, index) {
                setTimeout(function () {
                    element(self, browser);
                }, index * self.shopConfig.pauseBetweenSteps);
            });
        };
    }
}

module.exports = kith_com;