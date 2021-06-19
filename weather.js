'use strict';

require("dotenv").config();
const axios = require('axios');
const Forcast=require('./constForcast');
const express = require('express');
const server = express();
const cors = require('cors');
server.use(cors());

function weather (req,res){
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    let cityName = req.query.city_name;
    let weatherUrl = `${process.env.WEATHERURL}${cityName}&key=${WEATHER_API_KEY}`;
    console.log(weatherUrl);
    let weatherArr = [];
    axios.get(weatherUrl).then((item) => {
        weatherArr = item.data.data.map((i) => {
            return new Forcast(i);
        })
        res.send(weatherArr)
    }).catch((error) => (

        res.status(500).send('error: you may enter incorrect city name'))
    )

}

module.exports = weather;