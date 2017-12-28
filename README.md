# SneakersBiip (autocheckout)
Autofill script for hot stores

### Setup
* install nodejs and npm
* clone repo
* npm install
* node app.js

### Configure
`config.json` (./config.json)
* **proxy**: Set up the proxy.
* **userAgent**: Customize your user agent which you want to use during autocheckout.
* **gCookies**: An array of cookies, do not leave empty, it will cause program to crash. See this repo for explanation on how to build the array. Used properly this will let you through captcha without solving 10 times.

**kith.com** `1003` `kith_com.json` (./shops/configs/kith_com.json)
* **sizes**: Select sizes which you want to checkout with priority by order.
* **strictSizes**: Do not buy checkout if not matched in sizes.
* **pauseBetweenSteps**: Pause between steps (ms).
* **customerInformation**: Information you want to use in autofill.
  + **paymentMethod**: 1 = PayPal, 2 = Card (it is not necessary to fill in an unused method).

**supremenewyork.com** `6026` `supremenewyork_com.json` (./shops/configs/supremenewyork_com.json)
* **sizes**: Select sizes which you want to checkout with priority by order.
* **strictSizes**: Do not buy checkout if not matched in sizes.
* **pauseBetweenSteps**: Pause between steps (ms).
* **gmail**: Setting up the login to a gmail account before starting an autofill (entry to gmail reduces the likelihood of captcha).
  + **enabled**: use/not use.
* **customerInformation**: Information you want to use in autofill.
  + **paymentMethod**: 1 = Visa, 2 = American Express, 3 = Mastercard, 4 = Solo, 5 = Paypal (it is not necessary to fill in an unused method).
  
### Proxy
The script supports the following proxy format: { hostPort: "xxx.xxx.xxx.xxx:xxxx", login: "login", password: "password" }.

### Launching (Step by step)
* If not installed, install [node.js](https://nodejs.org/)
* If not installed, install [npm](https://www.npmjs.com/)
* Open command prompt and go to the project location
* Install packages with command: npm install `package`
  + `nightmare`
  + `nightmare-iframe-manager`
  + `lodash`
  + `util`
* Configure `shop`.json which you want to use
* Run script with commands:
  + node sb_autocheckout.js `shopId` `link`
  + node sb_autocheckout.js `shopId` `link` `proxy`
  + node sb_autocheckout.js `shopId` `link` `proxy` `size`