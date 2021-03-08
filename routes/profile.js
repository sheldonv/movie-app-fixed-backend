const express = require('express');
const profileRouter = express.Router();
const Profile = require('../models/profile')

profileRouter.get('/:id', (req, res, next) => {
    const profileId = req.params.id;
    Profile.findOne({_id: profileId}).then(
        (profile) => {
            res.status(200).json(profile)
        }
    ).catch(
        (error) => {
            res.status(404).json({message: 'Profile Not Found'})
        }
    )
})

module.exports = profileRouter