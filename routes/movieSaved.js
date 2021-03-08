const express = require('express');
const movieSavedRouter = express.Router();
const Movie = require('../models/movie');
const mongoose = require('mongoose');
const Reply = require('../models/reply')

const authCheck = require('../middleware/auth-check');

movieSavedRouter.post('', authCheck, (req, res, next) => {
    Movie.findOne({movieId: req.body.movieId}).then(
        async (movie) => {
            if(movie){
                const sess = await mongoose.startSession();
                sess.startTransaction(); 
                movie.leadComments.push({comment: req.body.comment, creator: req.body.creator, userName: req.body.userName }); 
                await movie.save({ session: sess }); 
                await sess.commitTransaction();
                res.status(201).json(movie)
            }else{
                const movie = new Movie({ 
                    movieId: req.body.movieId, 
                    leadComments: {
                        comment: req.body.comment,
                        creator: req.body.creator,
                        userName: req.body.userName
                    },
                })
                console.log(movie)
                movie.save().then(
                    (movie) => {
                        res.status(201).json(movie) 
                    }
                ).catch(
                    (error) => {
                        res.status(404).json({
                            message: 'Something went wrong'
                        })
                    }
                )
                }
        }
    )
    
   
       
    
})
movieSavedRouter.get('/comments/:movieId', (req, res, next) => {
    console.log(req.params.movieId)
    Movie.findOne({movieId: req.params.movieId}).populate('leadComments.creator').then(
        (movies) => {
            res.status(200).json(movies)
        }
    )
})
movieSavedRouter.post('/replies', (req, res, next) => {
    const leadCommentId = req.body.leadCommentId;
    const replyTo = req.body.replyTo;
    const comment = req.body.comment;
    const creator = req.body.creator;
    const reply = new Reply({
        leadCommentId: leadCommentId,
        replyTo: replyTo,
        comment: comment,
        creator: creator 
    })
    console.log(reply)
    reply.save().then(
        (response) => {
            res.status(201).json(response) 
        }
    )
})
movieSavedRouter.get('/replies/:leadComment', (req, res, next) => {
    const leadComment = req.params.leadComment;
    Reply.find({leadCommentId: leadComment}).populate('creator').then(
        (response) => {
            res.status(200).json(response)
        }
    )
})
module.exports = movieSavedRouter; 