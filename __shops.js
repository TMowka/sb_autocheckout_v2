/*6026*/
const supremenewyork_com = require('./shops/supremenewyork_com.js');

class __shops{
    constructor(){
        this.shopsArr = [
            new supremenewyork_com
        ];

        this.getShop = function(shopId){
            let searchShop;
            this.shopsArr.forEach(function(item){
                if(item.id == shopId) searchShop = item;
            });

            if(!searchShop) throw 'Shop not found. Trace: __shops.js 12L-14L';
            return searchShop;
        };
    }
}

module.exports = __shops;