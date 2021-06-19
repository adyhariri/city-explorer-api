'use strict';

require("dotenv").config();
const axios = require('axios');
const Movie = require('./constMovies');
let memory={};

function movies(req,res){
    let movieKey = process.env.MOVIE_API_KEY;
    let cityName = req.query.query;
    if(memory[cityName]!==undefined)
    {
        res.send(memory[cityName]);
    }else{
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
}}
module.exports=movies;