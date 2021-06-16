const express = require('express');
const server = express();
const cors = require('cors');
const weatherData = require('./data/weather.json');
require("dotenv").config();
server.use(cors());

const PORT=process.env.PORT;
server.get('/',(req,res) =>{
    res.send('mahmoud alhariri');
})
//http://localhost:3005/Weather
server.get('/weather',(req,res)=>{
    let cityName=req.query.city_name;
    //let lat=req.query.lat;
    //let lon=req.query.lon;
    let searchQuery=weatherData.find(item=>{
        if((cityName.toLowerCase()==item.city_name.toLowerCase()))
        return item;
    })
    try{
        let forecastArr=[];
        forecastArr= searchQuery.data.map(item=>{
            return new Forcast(item);
        })
        res.send(forecastArr);
    }
    catch(errors){
        res.status(404).send('error:city not found');
    }
})

class Forcast{
    constructor(item){
        this.date=item.valid_date;
        this.des=item.weather.description;
    }
}
// server.get('/weatherk',(req,res)=>{
//     const responceData=weatherData.data.map(obj=>new Forcast(obj))
//     res.json(responceData);
// });
// class Forcast{
//     constructor(weatherData){
//         this.description=weatherData.data.weather.description;
//         this.date=weatherData.valid_date;
//     }
// }
server.listen(PORT);