const express = require('express');
const movieRouter = express.Router();
const apiKey = 'a770c05458ba7641214d3596643d0d67';

const request = require('request')


movieRouter.get('/now_playing/:page', (req, res, next) => {
    console.log('reached')
    const page = req.params.page;
    request({
        uri: 'https://api.themoviedb.org/3/movie/now_playing?',
        qs: {
            api_key: 'a770c05458ba7641214d3596643d0d67',
            language: 'en_US',
            page: page 
        }
    }).pipe(res)  
})

movieRouter.get('/popular/:page', (req, res, next) => {
    console.log('reached')
    const page = req.params.page;
    request({
        uri: 'https://api.themoviedb.org/3/movie/popular?',
        qs: {
            api_key: apiKey,
            language: 'en-US',
            page: page
        }
    }).pipe(res)
})

movieRouter.get('/top_rated/:page', (req, res, next) => {
    console.log('reached')
    const page = req.params.page;
    request({
        uri: 'https://api.themoviedb.org/3/movie/top_rated',
        qs: {
            api_key: apiKey,
            language: 'en-US',
            page: page
        }
    }).pipe(res)
})

movieRouter.get('/coming_soon/:page', (req, res, next) => {
    const page = req.params.page;
    console.log('reached')
    request({
        uri: 'https://api.themoviedb.org/3/movie/upcoming',
        qs: {
            api_key: apiKey,
            language: 'en-US',
            page: page
        }
    }).pipe(res) 
})

movieRouter.get('/:movie_id', (req, res, next) => {
    console.log('reached')
    const movieId = req.params.movie_id;
    request({
        uri: `https://api.themoviedb.org/3/movie/${movieId}?/&append_to_response=videos,similar,credits,reviews,images`,
        qs: {
            api_key: apiKey,
            language: 'en-US'
        }
    }).pipe(res)
})

module.exports = movieRouter;

