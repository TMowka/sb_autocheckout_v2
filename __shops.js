class __shops{
    constructor(){
        /*6026*/
        const supremenewyork_com = require('./shops/supremenewyork_com.js');
        
        this.shopsArr = [].push(
            supremenewyork_com
        );
    }

    get shop(shopId){
        this.shopsArr.forEach(item => {
            if(item.shopId == shopId) return item;
        });
    }
}