const express = require('express');
const loginRouter = express.Router();
const Profile = require('../models/profile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

loginRouter.post('', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password)
    let fetchedProfile;
    Profile.findOne({email: email}).then(
        (profile) => {
            if(!profile){
                return res.status(500).json({
                    message: 'Profile not found',
                    auth: false
                })
            }else{
                 console.log(profile.password)
                 fetchedProfile = profile;
                 return bcrypt.compare(password, profile.password)
            }
        }
    ).then(
        (results) => {
            if(!results){
                return res.status(404).json({message: 'Password not Valid'})
            }
            const token = jwt.sign({name: fetchedProfile.name, id: fetchedProfile._id},
                                    process.env.JWT_KEY,
                                     {expiresIn: '1h'})
            res.status(200).json({profile: fetchedProfile, auth: true, token: token})
        }
    )
})
module.exports = loginRouter;