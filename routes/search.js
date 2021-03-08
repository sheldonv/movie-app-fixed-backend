const express = require('express');
const searchRouter = express.Router();
const apiKey = 'a770c05458ba7641214d3596643d0d67';
const request = require('request')



searchRouter.get('/movie/:query', (req, res, next) => {
    console.log('searched')
    const query = req.params.query;
    request({
        uri: 'https://api.themoviedb.org/3/search/movie?',
        qs: {
            api_key: apiKey,
            query: query,
            language: 'en-US'
        } 
    }).pipe(res); 
})
searchRouter.get('/database/:query', (req, res, next) => {
    console.log('database');
    const query = req.params.query;
    request({
        uri: 'https://api.themoviedb.org/3/search/multi?',
        qs: {
            api_key: apiKey,
            query: query,
            language: 'en-US'
        }
    }).pipe(res)
})
searchRouter.get('/actor/:query', (req, res, next) => {
    console.log('reached')
    const query = req.params.query;
    request({
        uri: 'https://api.themoviedb.org/3/search/person?',
        qs: {
            api_key: apiKey,
            query: query,
            language: 'en-US',
            sort_by: 'popularity.desc'
        }
    }).pipe(res)
})
module.exports = searchRouter; 