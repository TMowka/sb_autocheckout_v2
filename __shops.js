/*1003*/
const kith_com = require('./shops/kith_com.js');

/*6026*/
const supremenewyork_com = require('./shops/supremenewyork_com.js');

class __shops{
    constructor(size){
        this.shopsArr = [
            new supremenewyork_com(size),
            new kith_com(size)
        ];

        this.getShop = function(shopId){
            let searchShop;
            this.shopsArr.forEach(function(item){
                if(item.id == shopId) searchShop = item;
            });

            if(!searchShop) throw `Shop with id:${shopId} not found.`;
            return searchShop;
        };
    }
}

module.exports = __shops;