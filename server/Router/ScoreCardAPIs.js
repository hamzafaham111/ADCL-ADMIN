const mongoose = require("mongoose")
const express = require('express')
const router = express.Router();
const PlayerSchema = require('../Model/PlayerSchema')
const Tournaments = require('../Model/tournamentSchema');

router.get('/scorecard-active-players', async (req, res) => {
    const data = await PlayerSchema.find({ playerStatus: 'Active' })
    res.status(200).json({ data })
})
router.post('/add-team-player', (req, res) => {
    console.log(req.body);
    res.send("")
})
router.get('/find-fixture', async (req, res) => {
    const { fixtureid, tournamentid } = req.headers;
    const data = await Tournaments.findOne({ _id: tournamentid })
    const { fixtures } = data;
    const fixture = fixtures.find((val) => {
        return val.matchID == "T-F1-4990"
    })


    console.log(fixture);
    res.status(200).json({ data: fixture })
})
module.exports = router;