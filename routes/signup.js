const express = require('express');
const signUpRouter = express.Router();
const Profile = require('../models/profile');
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

signUpRouter.post('', multer({storage:storage}).single('image'), (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            if(!hash){
                return res.status(404).json({message: 'password not Created'})
            }
            console.log('signup')
            console.log(req.body.name)
            const url = req.protocol + '://' + req.get('host');
            const profile = new Profile({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                image: url + '/uploads/' + req.file.filename
            })
            
            console.log(profile)
            profile.save().then(
                (response) => {
                    const token = jwt.sign({name: response.name, id: response._id},
                    process.env.JWT_KEY,
                    {expiresIn: '1h'})
                    res.status(201).json({response,token})
                }
            ).catch(
                (error) => {
                    if(req.file){
                        fs.unlink(req.file.path, err => {
                            console.log(err)
                        })
                    }
                    res.status(404).json({
                        message: 'Email not unique', 
                        error: error
                    })
                }
            )
                }
            )
            
})
module.exports = signUpRouter