class supremenewyork_com {
    constructor(sizes) {
        this.id = 6026;
        this.homePage = 'supremenewyork.com';
        this.shopConfig = require('./configs/supremenewyork_com.json');
        this.sizes = sizes || this.shopConfig.sizes;
        this.steps = [];

        if (this.shopConfig.gmail.enabled) {
            //1
            this.steps.push(function (self, browser) {
                browser
                    .goto('https://mail.google.com/')
                    .catch(function (error) {
                        console.error(util.inspect(error));
                    });
            });

            //2
            this.steps.push(function (self, browser) {
                browser
                    .insert('input[type="email"]', self.shopConfig.gmail.email)
                    .click('.RveJvd')
                    .catch(function (error) {
                        console.error(util.inspect(error));
                    });
            });

            //3
            this.steps.push(function (self, browser) {
                browser
                    .insert('input[type="password"]', self.shopConfig.gmail.password)
                    .click('.RveJvd')
                    .catch(function (error) {
                        console.error(util.inspect(error));
                    });
            });

            //4
            this.steps.push(function (self, browser) {
                browser
                    .back()
                    .back()
                    .catch(function (error) {
                        console.error(util.inspect(error));
                    });
            });
        }

        //1
        this.steps.push(function (self, browser) {
            let sizeValue;
            browser
                .evaluate(function () {
                    var options = [];
                    $('#size').children().each(function (index) {
                        options.push({
                            'text': $(this).text(),
                            'value': $(this).attr('value')
                        });
                    });
                    return options;
                })
                .then(function (options) {
                    sizeValue = options._diff(self.sizes);

                    if (!sizeValue && self.shopConfig.strictSizes)
                        throw 'Specified size not found';

                    return sizeValue ? browser
                        .select('#size', sizeValue)
                        .click('input[value="add to basket"]')
                        .catch(function (error) {
                            console.error(util.inspect(error));
                        }) : browser
                        .click('input[value="add to basket"]')
                        .catch(function (error) {
                            console.error(util.inspect(error));
                        });
                });
        });

        //2
        this.steps.push(function (self, browser) {
            browser
                .click('a.button.checkout')
                .catch(function (error) {
                    console.error(util.inspect(error));
                });

        });

        //3
        this.steps.push(function (self, browser) {
            let paymentMethod;
            switch (self.shopConfig.customerInformation.paymentMethod) {
                case 1:
                    paymentMethod = 'visa';
                    break;
                case 2:
                    paymentMethod = 'american_express';
                    break;
                case 3:
                    paymentMethod = 'master';
                    break;
                case 4:
                    paymentMethod = 'solo';
                    break;
                case 5:
                    paymentMethod = 'paypal';
                    break;
                default:
                    console.error('Incorrect or not selected "paymentMethod"');
            }

            browser
                .insert('#order_billing_name', self.shopConfig.customerInformation.fullName)
                .insert('#order_email', self.shopConfig.customerInformation.email)
                .insert('#order_tel', self.shopConfig.customerInformation.tel)
                .insert('#bo', self.shopConfig.customerInformation.address)
                .insert('#oba3', self.shopConfig.customerInformation.address2)
                .insert('#order_billing_address_3', self.shopConfig.customerInformation.address3)
                .insert('#order_billing_city', self.shopConfig.customerInformation.city)
                .insert('#order_billing_zip', self.shopConfig.customerInformation.postCode)
                .select('#order_billing_country', self.shopConfig.customerInformation.country)
                .select('#credit_card_type', paymentMethod)
                .evaluate(function () {
                    $('.iCheck-helper').trigger('click');
                })
                .catch(function (error) {
                    console.error(util.inspect(error));
                });
        });

        if (this.shopConfig.customerInformation.paymentMethod > 0 && this.shopConfig.customerInformation.paymentMethod <= 4) {
            //4?
            this.steps.push(function (self, browser) {
                browser
                    .insert('#cnb', self.shopConfig.customerInformation.card.number)
                    .select('#credit_card_month', self.shopConfig.customerInformation.card.month)
                    .select('#credit_card_year', self.shopConfig.customerInformation.card.year)
                    .insert('#vval', self.shopConfig.customerInformation.card.cvv)
                    .catch(function (error) {
                        console.error(util.inspect(error));
                    });
            });
        }

        //5
        this.steps.push(function (self, browser) {
            browser
                .click('input.button.checkout')
                .catch(function (error) {
                    console.error(util.insert(error));
                });
        });

        if (this.shopConfig.customerInformation.paymentMethod === 5) {
            //5?
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

            //6?
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

module.exports = supremenewyork_com;