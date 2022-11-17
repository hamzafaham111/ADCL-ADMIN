const express = require('express');
const router = express.Router();
const PlayerSchema = require('../Model/PlayerSchema')
const multer = require('multer')
const RandExp = require('randexp');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'playersImages');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    },
}
)
const upload = multer({ storage: storage });
router.post('/add-new-player', upload.single('file'), async (req, res) => {

    const randexp = new RandExp(/[0-9]{5}/);
    const idNumber = randexp.gen();
    const playerData = req.body.data;
    const data = JSON.parse(playerData);
    const playersNumber = await PlayerSchema.count();
    const ID = `P-${playersNumber + 1}-${idNumber}`
    const interData = new PlayerSchema({ ...data, image: req.file.filename, playerID: ID });
    const playerAdded = await interData.save()
    if (playerAdded) {
        console.log("PlyerAdded successfully");
    } else {
        console.log("coudn't add the player");
    }
    res.status(200).json({ msg: "hello sir" })
})


router.delete('/delete-player', async (req, res) => {
    const ID = req.headers.id
    const playerDeleted = await PlayerSchema.deleteOne({ _id: ID })
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



router.get('/display-players', async (req, res) => {
    const data = await PlayerSchema.find();
    console.log(data);
    res.status(200).json({
        playersData: data
    })
})





router.post('/player-details-display', async (req, res) => {
    const { player_id } = req.body;
    const player_details = await PlayerSchema.findOne({ _id: player_id })
    console.log(player_details);
    res.status(200).send({ data: player_details })
})

module.exports = router;