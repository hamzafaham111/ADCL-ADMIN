const mongoose = require('mongoose')

const SeasonSchema = mongoose.Schema({
    seasonID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    finishDate: {
        type: String,
        default: "Continue"
    },
    status: {
        type: String,
        required: true,
    },
    teamPoints: {
        type: Number,
    },
    avalablePlayers: {
        type: Array,
    },
    categories:
    {
        type: Array
    },
    teams: {
        type: Array
    },
    playersToCategories: {
        type: Array
    },
})



const Seasons = mongoose.model('Seasons', SeasonSchema);

module.exports = Seasons;