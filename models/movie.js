const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    movieId: {type: String, required: true},
    leadComments: [{
        comment:{type: String, required:true},
        creator:{type: mongoose.Types.ObjectId, ref: 'Profile', required:true},
        userName:{type: String, required: true}
    }]
})
module.exports = mongoose.model('Movie', movieSchema)