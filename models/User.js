const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email: {
        type : String
    },
    googleId: {
        type : String
    },
    profile: {
        type : String
    },
    avatar: {
        type : String
    },
    accessToken:{
        type: String
    }
});

module.exports = User = mongoose.model('user', userSchema);