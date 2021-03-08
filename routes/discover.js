const express = require('express');
const discoverRouter = express();
const request = require('request');
const apiKey = 'a770c05458ba7641214d3596643d0d67';


discoverRouter.get('/genres', (req, res, next) => {
    request({
        uri: 'https://api.themoviedb.org/3/genre/movie/list?',
        qs: {
            api_key: apiKey,
            language: 'en-US' 
        }
           
    }).pipe(res)
})
discoverRouter.get('/:name/:year/:genre', (req, res, next) => {
    const name = req.params.name;
    const year = req.params.year;
    const genre = req.params.genre;
    request({
        uri: 'https://api.themoviedb.org/3/discover/movie?',
        qs: {
            api_key: apiKey,
            language: 'en-US',
            primary_release_year: year,
            with_people: name,
            with_genres: genre
        }     
    }).pipe(res)
}) 
module.exports = discoverRouter;