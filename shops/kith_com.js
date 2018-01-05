class kith_com {
    constructor(sizes) {
        this.id = 1003;
        this.homePage = 'kith.com';
        this.shopConfig = require('./configs/kith_com.json');
        this.sizes = sizes || this.shopConfig.sizes;
        this.steps = [];

        //1
        this.steps.push((browser, self = this) => {
            let sizeValue;
            browser
                .evaluate(() => {
                    var options = [];
                    $('#productSelect-option-0').children().each(function (index) {
                        options.push({
                            'text': $(this).text(),
                            'value': $(this).attr('value')
                        });
                    });
                    return options;
                })
                .then((options) => {
                    sizeValue = options._diff(self.sizes);

                    if (!sizeValue && self.shopConfig.strictSizes)
                        throw 'Specified size not found';

                    return sizeValue ? browser
                        .select('#productSelect-option-0', sizeValue)
                        .click('#AddToCart')
                        .catch((error) => {
                            console.error(util.inspect(error));
                        }) :
                        browser
                        .click('#AddToCart')
                        .catch((error) => {
                            console.error(util.inspect(error));
                        });
                });
        });

        //2
        this.steps.push((browser, self = this) => {
            browser
                .click('.btn.btn--full.cart-checkout')
                .catch((error) => {
                    console.error(util.insert(error));
                });
        });

        //3
        this.steps.push((browser, self = this) => {
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
                .catch((error) => {
                    console.error(util.inspect(error));
                });
        });

        //4
        this.steps.push((browser, self = this) => {
            browser
                .click('.step__footer__continue-btn.btn')
                .catch((error) => {
                    console.error(util.inspect(error));
                });
        });

        //5
        this.steps.push((browser, self = this) => {
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
                        .catch((error) => {
                            console.error(util.inspect(error));
                        });
                    break;
                case 2:
                    browser
                        .check('#checkout_payment_gateway_3700574')
                        .click('.step__footer__continue-btn.btn')
                        .catch((error) => {
                            console.error(util.inspect(error));
                        });
                    break;
                default:
                    console.error('Incorrect or not selected "paymentMethod"');
            }
        });

        if (this.shopConfig.customerInformation.paymentMethod === 2) {
            //6?
            this.steps.push((browser, self = this) => {
                browser
                    .insert('#email', '')
                    .insert('#email', self.shopConfig.customerInformation.payPal.email)
                    .insert('#password', self.shopConfig.customerInformation.payPal.password)
                    .click('#btnLogin')
                    .catch((error) => {
                        console.error(util.inspect(error));
                    });
            });

            //7?
            this.steps.push((browser, self = this) => {
                browser
                    .click('#confirmButtonTop')
                    .catch((error) => {
                        console.error(util.inspect(error));
                    });
            });
        }

        this.runSteps = (browser, self = this) => {
            this.steps.forEach((element, index) => {
                setTimeout(() => {
                    element.call(self, browser);
                }, index * self.shopConfig.pauseBetweenSteps);
            });
        };
    }
}

module.exports = kith_com;