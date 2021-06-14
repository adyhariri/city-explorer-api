const express = require('express');
const server = express();
const cors = require('cors');
const weatherData = require('./data/weather.json');
server.use(cors());

const port=3005;
server.get('/',(req,res) =>{
    res.send('mahmoud alhariri');
})
server.get('/getWeather',(req,res)=>{
    let getWeather = weatherData.data.map(item=>{
        return item;
    })
    res.send(getWeather);
})
server.listen(port,()=>{})