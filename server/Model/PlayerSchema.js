const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    playerID: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    nationality: {
        type: String,
    },
    gender: {
        type: String,

    },
    DOB: {
        type: String,

    },
    battingStyle: {


    },
    bowlingStyle: {
        type: String,

    },
    playingRole: {
        type: String,

    },
    playerStatus: {
        type: String,

    },
    image: {
        type: String,
    }
})

const Players = mongoose.model('Player', PlayerSchema);

module.exports = Players;