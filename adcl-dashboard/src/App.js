
import './App.css';
import Master from './Master';
import Login from './Login'
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Content/Home.js/Home';
import Players from './Components/Content/Players/Players';
import NewPlayer from './Components/Content/Players/NewPlayer/NewPlayer';
import Tournament from './Components/Content/Tournaments/Tournament'
import NewTournament from './Components/Content/Tournaments/NewTournament/NewTournament';
import PlayerDetails from './Components/Content/Players/PlayerDetails/PlayerDetails';
import TournamentDetails from './Components/Content/Tournaments/TournamentDetails/TournamentDetails';
import Scorecard from './Components/Content/Scorecard/Scorecard (1)';
import Seasons from './Components/Content/Season/Seasons';
import NewSeason from './Components/Content/Season/CreateSeason/NewSeason';
import SeasonDetails from './Components/Content/Season/SeasonDetails/SeasonDetails';
import AllotPlayers from './Components/Content/Season/CreateSeason/AllotPlayers/AllotPlayers';
import AddTeam from './Components/Content/Teams/AddTeam/AddTeam';
import AddTeamPlayers from './Components/Content/Scorecard/AddTeamPlayers/AddTeamPlayers';
function App() {

  return (
    <div className="App">
      {
        <Routes>
          <Route path='' element={<Login />} />
          <Route path='/dashboard' element={<Master />} >
            <Route path='' element={<Home t="Home" />} />
            <Route path='players' element={<Players t="Players" />} />
            <Route path='add-new-player' element={<NewPlayer link="/dashboard/Players" in="Players" t="Add New Player" />} />
            <Route path='players/player-detailes/:playerID' element={<PlayerDetails link="/dashboard/players" in="Players" t="Player Details" />} />
            <Route path='tournaments' element={<Tournament t="Tournament" />} />
            <Route path='add-new-tournment' element={<NewTournament link="/dashboard/tournaments" in="Tournaments" t="Add New Tournament" />} />
            <Route path='tournaments/tournament-details/:tournamentID' element={<TournamentDetails link="/dashboard/tournaments" in="Tournaments" t="Tournament Details" />} />
            <Route path='scorecard' element={<Scorecard t="Scorecard" />} />
            <Route path='add-team-players' element={<AddTeamPlayers t="Add Team Players" />} />
            <Route path='seasons' element={<Seasons t="Seasons" />} />
            <Route path='seasons/create-new-season' element={<NewSeason t="Create New Season" in="Seasons" link="/dashboard/seasons" />} />
            <Route path='allot-players-to-teams' element={<AllotPlayers t="Allot Players" />} />
            <Route path='seasons/season-details/:seasonID' element={<SeasonDetails t="Season Details" link="/dashboard/seasons" in="Seasons" />} />
            <Route path='add-new-team' element={<AddTeam t="Add New Team" />} />
          </Route>
        </Routes>
      }
    </div>
  );
}

export default App;
