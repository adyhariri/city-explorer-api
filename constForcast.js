'use strict';



class Forcast {
    constructor(item) {
        this.date = item.valid_date;
        this.des = item.weather.description;
    }
}
module.exports=Forcast;