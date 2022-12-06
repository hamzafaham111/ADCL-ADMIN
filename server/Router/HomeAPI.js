const express = require('express');
const router = express.Router();
const PlayerSchema = require('../Model/PlayerSchema')
const TournamentRout = require('../Model/tournamentSchema')
router.get('/home-data', async (req, res) => {
    const players = await PlayerSchema.find();
    const tournaments = await TournamentRout.find();
    const numberOfPlayers = players.length;
    const numberOfTournaments = tournaments.length;
    const data = {
        numberOfPlayers, numberOfTournaments
    }
    res.status(200).json({ data });
})




module.exports = router;