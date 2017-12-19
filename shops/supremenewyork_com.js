class supremenewyork_com {
    constructor(size) {
        this.id = 6026;
        this.homePage = 'supremenewyork.com';
        this.shopConfig = require('./configs/supremenewyork_com.json');
        this.size = size | this.shopConfig.size;
        this.steps = [];

        this.steps.push(function (self, browser) {
            browser
                .type('#search_form_input_homepage', 'test nightmare')
                .click('#search_button_homepage')
                .catch(function (error) {
                    throw error;
                });
        });

        this.steps.push(function (self, browser) {
            browser
                .type('#search_form_input', 'test nightmare 2')
                .click('#search_button')
                .catch(function (error) {
                    throw error;
                });
        });

        this.runSteps = function(self, browser){
            this.steps.forEach(function(element, index) {
                setTimeout(function(){
                    element(self, browser);
                }, index * self.shopConfig.pauseBetweenSteps);
            });
        };
    }
}

module.exports = supremenewyork_com;