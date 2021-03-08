const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator')
const profileSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String, required: true}
})
profileSchema.plugin(unique) 
module.exports = mongoose.model('Profile', profileSchema);     