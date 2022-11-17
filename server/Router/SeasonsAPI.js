const mongoose = require("mongoose")
const express = require('express')
const router = express.Router();
const PlayerSchema = require('../Model/PlayerSchema')
const Seasons = require('../Model/SeasonSchema');
const multer = require('multer')
const RandExp = require('randexp');

router.post('/create-season', async (req, res) => {
    console.log(req.body.basicData);
    const { name, startDate, finishDate, status, teamPoints } = req.body.basicData;
    const avalablePlayers = req.body.avalablePlayers;
    const seasonsNumber = await Seasons.count();
    const randexp = new RandExp(/[0-9]{5}/);
    const idNumber = randexp.gen();
    const playerData = req.body.data;
    const ID = `S-${seasonsNumber.length + 1}-${idNumber}}`
    const interData = new Seasons({ name, startDate, finishDate, status, teamPoints, avalablePlayers, seasonID: ID })
    if (interData) {
        interData.save()
    } else {
        console.log("something is wrong in creating season");
    }
    res.status(200).send()
})

router.delete('/delete-season', async (req, res) => {
    const ID = req.headers.id
    const seasonDeleted = await Seasons.deleteOne({ _id: ID })
    if (seasonDeleted) {
        console.log("Season Deleted Successfully");
        res.status(200).json({ message: "player deleted successfully" })
        return;
    } else {
        console.log("coudn't delete the Season");
        res.status(403).json({ error: "Couldn't Delete the Season" })
        return;
    }
})

router.get('/active-players', async (req, res) => {
    const data = await PlayerSchema.find({ playerStatus: 'Active' })
    res.status(200).json({ data })
})


router.post('/add-category', async (req, res) => {
    console.log(req);
    const { seasonID, categories } = req.body;
    const update = await Seasons.updateOne({ _id: seasonID }, {
        $set: {
            categories
        }
    })
    console.log(update);
    res.send("");
})

router.post('/get-season-players', async (req, res) => {
    const seasonID = req.body.seasonID
    const seasonData = await Seasons.findOne({ _id: seasonID })
    const avalablePlayersIDs = seasonData.avalablePlayers
    const playersData = await PlayerSchema.find();
    const players = [];
    avalablePlayersIDs.map((id) => {
        playersData.map((val) => {
            if (id == val._id) {
                players.push(val)
                console.log("Matched");
            }
        })
    })
    const categories = seasonData.categories;
    const data = {
        players,
        categories
    }
    res.status(200).json({ data })
})

router.post('/player-to-category', async (req, res) => {
    console.log(req.body);
    const playersToCategories = []
    req.body.playersToCategory.map((val) => {
        playersToCategories.push({ playerId: val.addedToCategoryPlayerId, playerCategory: val.category })
    })
    const updated = await Seasons.updateOne({ _id: req.body.seasonID }, {
        $set: {
            playersToCategories
        }
    })
    if (updated) {
        console.log("Players added to categories successfully");
    }
    res.status(200).send()
})


router.get('/categorie-players', async (req, res) => {
    const { categoryname, seasonid } = req.headers;
    const update = await Seasons.findOne({ _id: seasonid })
    const { playersToCategories, teams } = update;
    const categoryPlayersIds = playersToCategories.filter((val) => {
        return val.playerCategory == categoryname;
    })
    const playersData = await PlayerSchema.find({ playerStatus: 'Active' })
    const players = []
    categoryPlayersIds.map((val, index) => {
        console.log(index);
        const player = playersData.find((player) => {
            return val.playerId == player._id
        })
        players.push(player)
    })
    res.status(200).json({ players, teams })
})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'teamsLogos');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    },
}
)
const upload = multer({ storage: storage });


router.post('/add-season-teams', upload.single('logo'), async (req, res) => {
    const { teamName, seasonID } = req.body;
    const { _id, teams, teamPoints } = await Seasons.findOne({ _id: seasonID })
    console.log(teamName);
    const updated = await Seasons.updateOne({ _id: seasonID }, {
        $set: {
            teams: [...teams,
            {
                teamName: teamName,
                teamLogo: req.file.filename,
                teamPoints: teamPoints,
                remaningPoints: teamPoints,
                players: []
            }
            ]
        }
    })

    if (updated.acknowledged) {
        const { _id, teams } = await Seasons.findOne({ _id: seasonID })
        res.status(200).json({ data: teams })
    } else {
        res.send("")
    }
})
router.post('/delete-season-team', async (req, res) => {

    const { seasonID, afterDelete } = req.body;
    const teamDeleted = await Seasons.updateOne({ _id: seasonID }, {
        $set: {
            teams: afterDelete
        }
    })

    console.log(teamDeleted);

    if (teamDeleted.acknowledged) {
        const { _id, teams } = await Seasons.findOne({ _id: seasonID });
        res.status(200).json({ teams: teams })
    } else {

    }
})


router.post('/allot-player', async (req, res) => {
    const { seasonID, selectedCategory, selectedPlayer, buyingPoints, buyingTeam } = req.body;
    const { teams } = await Seasons.findOne({ _id: seasonID });
    const selectedTeam = teams.find((val) => {
        return val.teamName == buyingTeam;
    })


    selectedTeam.remaningPoints = selectedTeam.remaningPoints - buyingPoints;
    console.log(selectedTeam.players);
    selectedTeam.players.push({
        playerId: selectedPlayer,
        buyingPoints,
        category: selectedCategory
    })
    console.log(selectedTeam);
    const updayedTeams = teams.filter((val) => {
        return val.teamName !== buyingTeam;
    })


    updayedTeams.push(selectedTeam)

    const done = await Seasons.updateOne({ _id: seasonID }, {
        $set: {
            teams: updayedTeams
        }
    })

    res.status(200).json({ data: selectedTeam })
})



router.get('/display-seasons', async (req, res) => {
    const data = await Seasons.find();
    res.status(200).json({ data })
})
router.post('/season-details', async (req, res) => {
    const seasonID = req.body.seasonID;
    const PlayersData = await PlayerSchema.find();
    const data = await Seasons.findOne({ _id: seasonID })
    const playersIDsAndCategories = data.playersToCategories;

    const playersToCategories = [];
    playersIDsAndCategories.map((val) => {
        const category = val.playerCategory;
        const singlePlayer = PlayersData.find((data) => {
            return data._id == val.playerId
        })
        if (singlePlayer) {
            playersToCategories.push({ singlePlayer, category })
        } else {

            return;
        }
    })
    res.status(200).json({ data, playersToCategories })
})

router.get('/seasons', async (req, res) => {
    const data = await Seasons.find();
    res.status(200).json({ data })
})


module.exports = router;