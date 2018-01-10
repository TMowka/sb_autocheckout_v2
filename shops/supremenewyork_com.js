class supremenewyork_com {
    constructor(sizes) {
        this.id = 6026;
        this.homePage = 'supremenewyork.com';
        this.shopConfig = require('./configs/supremenewyork_com.json');
        this.sizes = sizes || this.shopConfig.sizes;
        this.steps = [];

        if (this.shopConfig.gmail.enabled) {
            //1?
            this.steps.push((browser) => {
                browser
                    .goto('https://mail.google.com/')
                    .catch((error) => {
                        console.error(util.inspect(error));
                    });
            });

            //2?
            this.steps.push((browser) => {
                browser
                    .insert('input[type="email"]', this.shopConfig.gmail.email)
                    .click('.RveJvd')
                    .catch((error) => {
                        console.error(util.inspect(error));
                    });
            });

            //3?
            this.steps.push((browser) => {
                browser
                    .insert('input[type="password"]', this.shopConfig.gmail.password)
                    .click('.RveJvd')
                    .catch((error) => {
                        console.error(util.inspect(error));
                    });
            });

            //4?
            this.steps.push((browser) => {
                browser
                    .back()
                    .back()
                    .catch((error) => {
                        console.error(util.inspect(error));
                    });
            });
        }

        //1
        this.steps.push((browser) => {
            let sizeValue;
            browser
                .evaluate(() => {
                    var options = [];
                    $('#size').children().each(function (index) {
                        options.push({
                            'text': $(this).text(),
                            'value': $(this).attr('value')
                        });
                    });
                    return options;
                })
                .then((options) => {
                    sizeValue = options._diff(this.sizes);

                    if (!sizeValue && this.shopConfig.strictSizes)
                        throw 'Specified size not found';

                    return sizeValue ? browser
                        .select('#size', sizeValue)
                        .click('input[value="add to basket"]')
                        .catch((error) => {
                            console.error(util.inspect(error));
                        }) : browser
                        .click('input[value="add to basket"]')
                        .catch((error) => {
                            console.error(util.inspect(error));
                        });
                });
        });

        //2
        this.steps.push((browser) => {
            browser
                .click('a.button.checkout')
                .catch((error) => {
                    console.error(util.inspect(error));
                });

        });

        //3
        this.steps.push((browser) => {
            let paymentMethod;
            switch (this.shopConfig.customerInformation.paymentMethod) {
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
                .insert('#order_billing_name', this.shopConfig.customerInformation.fullName)
                .insert('#order_email', this.shopConfig.customerInformation.email)
                .insert('#order_tel', this.shopConfig.customerInformation.tel)
                .insert('#bo', this.shopConfig.customerInformation.address)
                .insert('#oba3', this.shopConfig.customerInformation.address2)
                .insert('#order_billing_address_3', this.shopConfig.customerInformation.address3)
                .insert('#order_billing_city', this.shopConfig.customerInformation.city)
                .insert('#order_billing_zip', this.shopConfig.customerInformation.postCode)
                .select('#order_billing_country', this.shopConfig.customerInformation.country)
                .select('#credit_card_type', paymentMethod)
                .evaluate(() => {
                    $('.iCheck-helper').trigger('click');
                })
                .catch((error) => {
                    console.error(util.inspect(error));
                });
        });

        if (this.shopConfig.customerInformation.paymentMethod > 0 && this.shopConfig.customerInformation.paymentMethod <= 4) {
            //4?
            this.steps.push((browser) => {
                browser
                    .insert('#cnb', this.shopConfig.customerInformation.card.number)
                    .select('#credit_card_month', this.shopConfig.customerInformation.card.month)
                    .select('#credit_card_year', this.shopConfig.customerInformation.card.year)
                    .insert('#vval', this.shopConfig.customerInformation.card.cvv)
                    .catch((error) => {
                        console.error(util.inspect(error));
                    });
            });
        }

        //5
        this.steps.push((browser) => {
            browser
                .click('input.button.checkout')
                .catch((error) => {
                    console.error(util.insert(error));
                });
        });

        if (this.shopConfig.customerInformation.paymentMethod === 5) {
            //5?
            this.steps.push((browser) => {
                browser
                    .insert('#email', '')
                    .insert('#email', this.shopConfig.customerInformation.payPal.email)
                    .insert('#password', this.shopConfig.customerInformation.payPal.password)
                    .click('#btnLogin')
                    .catch((error) => {
                        console.error(util.inspect(error));
                    });
            });

            //6?
            this.steps.push((browser) => {
                browser
                    .click('#confirmButtonTop')
                    .catch((error) => {
                        console.error(util.inspect(error));
                    });
            });
        }

        this.runSteps = (browser) => {
            this.steps.forEach((element, index) => {
                setTimeout(() => {
                    element(browser);
                }, index * this.shopConfig.pauseBetweenSteps);
            });
        };
    }
}

module.exports = supremenewyork_com;