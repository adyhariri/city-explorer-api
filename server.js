'use strict';
const express = require('express');
const server = express();
const cors = require('cors');
//const weatherData = require('./data/weather.json');
require("dotenv").config();
server.use(cors());

const weather = require('./weather');
const movies= require('./movies');


const PORT = process.env.PORT;
server.get('/', (req, res) => {
    res.send('mahmoud alhariri');
})


//http://localhost:3005/Weather
server.get('/weather', weather) ;

server.get('/movies', movies);

server.listen(PORT);
//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY