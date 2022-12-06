const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv')

app.use(express.json())
app.use(cors());

//used to access static images from the folder
app.use('/playersImages', express.static('playersImages'));
app.use('/teamsLogos', express.static('teamsLogos'));
// app.use('/playersImages', express.static('playersImages'));

//Routes Imported from Router
const LoginRout = require('./Router/LoginAPI')
const PlayerRout = require('./Router/PlayerAPI')
const TournamentRout = require('./Router/TournamentAPI')
const SeasonsRout = require('./Router/SeasonsAPI')
const HomeRout = require('./Router/HomeAPI')
const ScoreCardRout = require('./Router/ScoreCardAPIs')
//Routes used

app.use('/', LoginRout)
app.use('/', PlayerRout)
app.use('/', TournamentRout)
app.use('/', SeasonsRout)
app.use('/', HomeRout)
app.use('/', ScoreCardRout)



dotenv.config('./env');
const PORT = process.env.PORT || 5000;

require('./DB/conn')
if (process.env.NODE_ENV == "production") {
    app.use(exppress.static("adcl-dashboard/build"))
}
app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
})