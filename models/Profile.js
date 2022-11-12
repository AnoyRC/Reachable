const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    bio: {
        type: String,
    },
    Reach: {
        type: Number,
        default: 0
    },
    socials: {
        youtube:{
            type: String
        },
        twitter:{
            type: String
        },
        facebook:{
            type: String
        },
        instagram:{
            type: String
        }
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Profile = mongoose.model('profile',ProfileSchema);