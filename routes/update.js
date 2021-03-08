const express = require('express');
const updateRouter = express.Router();
const Profile = require('../models/profile');
const authCheck = require('../middleware/auth-check');
const multer = require('multer');
const fs = require('fs')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('MimeTypeError')
        if(isValid){
            error = null
        }
        cb(error, 'uploads/images')
    },
    filename: (req, file, cb) => {
        const ext = MIME_TYPE_MAP[file.mimetype];
        const name = file.originalname.split(' ').join('-');
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
}) 


updateRouter.patch('/:profileId', authCheck, multer({storage: storage}).single('image'), (req, res, next) => {
    console.log('updateRouter')
    const profileId = req.params.profileId;
    console.log(profileId)
    if(!profileId || profileId !== req.userData.id){
        return res.status(404).json({message: 'Profile Not Found'})
    }
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            if(!hash){
                return res.status(404).json({message: 'Password Not Created'})
            }

            const url = req.protocol + '://' + req.get('host');
            const newProfile = Profile({
                _id: profileId,
                name: req.body.name,
                email: req.body.email,
                password: hash,
                image: url + '/uploads/' + req.file.filename
            })
            Profile.updateOne({ _id: profileId }, newProfile).then(
                (profile) => {
                    res.status(201).json(profile)
                }
            ).catch(
                (error) => {
                    res.status(500).json({ message: 'Something went wrong', error: error}) 
                }
            )
        }
    )
    
})  

module.exports = updateRouter