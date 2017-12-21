# SneakersBiip (autocheckout)
Autofill script for hot stores

### Setup
* install nodejs and npm
* clone repo
* npm install
* node app.js

### Configure
`config.json` (./config.json)
* **userAgent**: Customize your user agent which you want to use during autocheckout.
* **gCookies**: An array of cookies, do not leave empty, it will cause program to crash. See this repo for explanation on how to build the array. Used properly this will let you through captcha without solving 10 times.

**kith.com** (shopId:1003)
`kith_com.json` (./shops/configs/kith_com.json)
* **size**: Select size which you want to checkout (this option is not supported yet).
* **pauseBetweenSteps**: Pause between steps (ms).
* **customerInformation**: Information you want to use in autofill.
  + **paymentMethod**: 1 = PayPal, 2 = Card (it is not necessary to fill in an unused method).

**supremenewyork.com** (shopId:6026)
`supremenewyork_com.json` (./shops/configs/supremenewyork_com.json)
* **size**: Select size which you want to checkout (this option is not supported yet).
* **pauseBetweenSteps**: Pause between steps (ms).
* **gmail**: Setting up the login to a gmail account before starting an autofill (entry to gmail reduces the likelihood of captcha).
  + **enabled**: use/not use.
* **customerInformation**: Information you want to use in autofill.
  + **paymentMethod**: 1 = Visa (Card), 2 = American Express (Card), 3 = Mastercard (Card), 4 = Solo (Card), 5 = Paypal (it is not necessary to fill in an unused method).
  
### Proxy
The script supports the following proxy format: { hostPort: "xxx.xxx.xxx.xxx:xxxx", login: "login", password: "password" }.

### Launching (Step by step)
<ul>
    <li>1. If not installed, install `node.js` https://nodejs.org/</li>
    <li>2. If not installed, install `npm` https://www.npmjs.com/</li>
    <li>3. Open command prompt and go to the project location</li>
    <li>4. Install packages with command: npm install `package`
    <ul>
        <li>`nightmare`</li>
        <li>`nightmare-iframe-manager`</li>
        <li>`lodash`</li>
        <li>`util`</li>
    </ul></li>
    <li>5. Configure `shop`.json which you want to use</li>
    <li>6. Run script with commands: 
    <ul>
        <li>node sb_autocheckout.js `shopId` `link`</li>
        <li>node sb_autocheckout.js `shopId` `link` `proxy`</li>
        <li>node sb_autocheckout.js `shopId` `link` `proxy` `size`</li>
    </ul></li>
</ul>