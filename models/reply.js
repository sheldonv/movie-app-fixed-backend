const mongoose = require('mongoose');
const replySchema = mongoose.Schema({
    leadCommentId: {type: mongoose.Types.ObjectId, ref: 'Movie', required: true},
    replyTo: {type: mongoose.Types.ObjectId, ref: 'Profile', required: true},
    comment: {type: String, required: true},
    creator: {type: mongoose.Types.ObjectId, ref: 'Profile', required: true}
})
module.exports = mongoose.model('Reply', replySchema)