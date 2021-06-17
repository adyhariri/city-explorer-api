'use strict';
const express = require('express');
const server = express();
const cors = require('cors');
const weatherData = require('./data/weather.json');
require("dotenv").config();
server.use(cors());
const axios = require('axios');


const PORT = process.env.PORT;
server.get('/', (req, res) => {
    res.send('mahmoud alhariri');
})
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

//http://localhost:3005/Weather
server.get('/weather', (req, res) => {
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

    // let searchQuery = weatherData.find(item => {
    //     if ((cityName.toLowerCase() == item.city_name.toLowerCase()))
    //         return item;
    // })
    // try {
    //     let forecastArr = [];
    //     forecastArr = searchQuery.data.map(item => {
    //         return new Forcast(item);
    //     })
    //     res.send(forecastArr);
    // }
    // catch (errors) {
    //     res.status(404).send('error:  city not found');
    // }
})
server.get('/movies', (req, res) => {
    let movieKey = process.env.MOVIE_API_KEY;
    let cityName = req.query.query;
    let movieUrl = `${process.env.MOVIEURL}${movieKey}&query=${cityName}`;
    console.log(movieUrl);
    let movieArr = [];
    axios.get(movieUrl).then((item) => {
        movieArr = item.data.results.map((i) => {
            return new Movie(i);
        })
        res.send(movieArr);
    }).catch((error) => {
        res.status(500).send('error :  there is no movie')
    })
})

class Forcast {
    constructor(item) {
        this.date = item.valid_date;
        this.des = item.weather.description;
    }
}
class Movie {
    constructor(item) {
        this.title = item.title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;
    }
}
server.listen(PORT);
//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY