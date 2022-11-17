const express = require('express');
const router = express.Router();
const Tournaments = require('../Model/tournamentSchema');
const RandExp = require('randexp');


router.post('/add-new-tournament', async (req, res) => {
    const { data, tags } = req.body;
    const tournamentsNumber = await Tournaments.count();
    const randexp = new RandExp(/[0-9]{5}/);
    const idNumber = randexp.gen();
    const playerData = req.body.data;
    const ID = `T-${tournamentsNumber + 1}-${idNumber}`
    const interTournamentData = new Tournaments({ ...data, sponsers: tags, tournamentID: ID })
    const dataIntered = await interTournamentData.save();
    if (dataIntered) {
        console.log("tournament added successfully");
    } else {
        console.log("proplem in adding data");
    }
    res.status(200).json({ message: "player added" })
})
router.delete('/delete-tournament', async (req, res) => {
    const ID = req.headers.id
    const playerDeleted = await Tournaments.deleteOne({ _id: ID })
    if (playerDeleted) {
        console.log("Plyer Deleted Successfully");
        res.status(200).json({ message: "player deleted successfully" })
        return;
    } else {
        console.log("coudn't delete the player");
        res.status(403).json({ error: "Couldn't Delete the player" })
        return;
    }

})
router.post('/add-new-team-to-tournament', async (req, res) => {
    const { tournamentID, newTeam, } = req.body
    const data = await Tournaments.findOne({ _id: tournamentID });
    const teams = data.teams
    const randexp = new RandExp(/[0-9]{5}/);
    const idNumber = randexp.gen();
    const exist = teams.some(val => {
        if (val.team == newTeam) {
            return true
        }
    })
    if (exist === false) {
        const addNewTeam = await Tournaments.updateOne({ _id: tournamentID }, {
            $set: {
                teams: [...teams, { teamID: `T-T${teams.length + 1}-${idNumber}`, team: newTeam }]
            }
        })
        const data2 = await Tournaments.findOne({ _id: tournamentID });
        res.status(200).json({ teams: data2.teams })
    } else {
        res.status(400).json({ error: "Team Alredy Exist" })
    }
})
router.post('/delete-team-from-tournament', async (req, res) => {
    const { tournamentID, afterDelete } = req.body;
    const teamDeleted = await Tournaments.updateOne({ _id: tournamentID }, {
        $set: {
            teams: afterDelete
        }
    })

    const data = await Tournaments.findOne({ _id: tournamentID });
    console.log(data);
    res.status(200).json({ teams: data.teams })
})
router.post('/delete-fixture-from-tournament', async (req, res) => {
    const { tournamentID, afterDelete } = req.body;
    const teamDeleted = await Tournaments.updateOne({ _id: tournamentID }, {
        $set: {
            fixtures: afterDelete
        }
    })

    const data = await Tournaments.findOne({ _id: tournamentID });
    console.log(data);
    res.status(200).json({ teams: data.teams })
})
router.post('/add-fixture', async (req, res) => {
    const { tournamentID, fixture, matchID } = req.body;
    const randexp = new RandExp(/[0-9]{5}/);
    const idNumber = randexp.gen();
    const playerData = req.body.data;
    const { fixtures } = await Tournaments.findOne({ _id: tournamentID });
    const addFixture = await Tournaments.updateOne({ _id: tournamentID }, {
        $set: {
            fixtures: [...fixtures, { ...fixture, matchID: `T-F${fixtures.length + 1}-${idNumber}`, }]
        }
    })
    const data = await Tournaments.findOne({ _id: tournamentID });
    res.status(200).json({ fixtures: data.fixtures });
})

router.get('/display-tournaments', async (req, res) => {
    const data = await Tournaments.find();
    console.log(data);
    res.status(200).json({ data })
})
router.post('/tournament-details-display', async (req, res) => {
    const { _id } = req.body
    const findData = await Tournaments.findOne({ _id })
    res.status(200).json({ data: findData })
})
router.get('/find-match', async (req, res) => {
    const match_ID = req.headers.id
    const { fixtures } = await Tournaments.findOne({
        "fixtures.matchID": match_ID
    })
    const exectMatch = fixtures.find((val) => {
        return val.matchID == match_ID
    })
    res.status(200).json({ data: exectMatch })

})

module.exports = router;


