const mongoose = require('mongoose');

const tournamentSchema = mongoose.Schema({
    tournamentID: {
        type: String,
        required: true
    },
    tournamentName: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    finishDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    internalExternal: {
        type: String,
        required: true
    },
    city: {
        type: String,

    },
    locationMapLink: {
        type: String,
    },
    locationDetails: {
        type: String,
    },
    teams: {
        type: Array,
    },
    winner: {
        type: String,
        default: "Continue"
    },
    runnerUp: {
        type: String,
        default: "Continue"
    },
    fixtures: {
        type: Array,
    },
    sponsers: {
        type: Array,
        default: "No Sponser Added"
    },
})

const Tournaments = mongoose.model('Tournament', tournamentSchema);


module.exports = Tournaments;