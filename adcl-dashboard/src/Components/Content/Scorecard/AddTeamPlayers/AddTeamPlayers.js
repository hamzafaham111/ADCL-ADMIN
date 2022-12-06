import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../Breadcrumb'
import axios from 'axios'
import useStyles from './Style'
import { Avatar, Grid } from '@material-ui/core'

const AddTeamPlayers = (Props) => {
    const classes = useStyles();
    const [tournaments, setTournaments] = useState([]);
    const [avalablePlayers, setAvalablePlayers] = useState([])
    const [avalablePlayersDB, setAvalablePlayersDB] = useState([])
    const [activePlayers, setActivePlayers] = useState([]);
    const [team, setTeam] = useState(true)
    const [fixtureData, setFixtureData] = useState({});
    const [teamName, setTeamName] = useState("...");
    const handleTeams = async () => {
        await axios.post(`${process.env.REACT_APP_DOMAIN}/add-team-player`, avalablePlayers).then((res) => {

        })
        if (team) {
            setTeamName(fixtureData.homeTeam);
            setTeam(false)
        } else {
            setTeamName(fixtureData.awayTeam)

        }

    }
    const [fixtureLocation, setFixtureLocation] = useState({
        tournamentID: "",
        fixtureID: ""
    });
    const handleFixture = (e) => {
        const { name, value } = e.target;
        setFixtureLocation((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const findFixture = async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/find-fixture`, {
            headers: fixtureLocation
        }).then((res) => {
            setFixtureData(res.data.data);
            setTeamName(res.data.data.homeTeam)
        })
    }
    const handleChecked = (e) => {
        const filteredPlayers = avalablePlayers.filter(function (player) {
            return player._id !== e.target.value;
        });
        setAvalablePlayers(filteredPlayers)
    }
    const homeTeam = () => {


    }
    const awayTeam = () => {
        console.log()
    }
    const handleActivePlayers = (e) => {
        activePlayers.map((val) => {
            if (val._id === e.target.value) {
                var status = avalablePlayers.some(function (el) {
                    return (el._id === e.target.value);
                });
                if (!status) {
                    setAvalablePlayers([...avalablePlayers, val])
                    setAvalablePlayersDB([...avalablePlayersDB, val._id])
                }
                else {
                    setAvalablePlayers([...avalablePlayers])
                    setAvalablePlayersDB([...avalablePlayersDB])
                }
            }
        })
    }



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/display-tournaments`).then((res) => {
            setTournaments(res.data.data)
        });
        axios.get(`${process.env.REACT_APP_DOMAIN}/scorecard-active-players`).then((res) => {
            setActivePlayers(res.data.data);
        })
    })
    return (
        <>
            <Breadcrumb t={Props.t} headerLine="Add Players To the Team avalable in the tournament" />
            <section className="content">
                <div className="container-fluid">
                    {/* Small boxes (Stat box) */}
                    <div className="row bg-white" style={{ borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
                        <div style={{ width: "100%", borderRadius: "10px", display: "flex", padding: "20px", flexDirection: "row", justifyContent: "space-between", alignItems: "end", }}>
                            <div style={{ display: "flex", flexDirection: "column", width: "30%", }}>
                                <label style={{ color: "gray" }}>Tournament</label>
                                <select style={{ padding: "3px", border: "solid gray 1px", color: "gray", borderRadius: "3px" }} onChange={handleFixture} name="tournamentID">
                                    <option>-- Select Tournament --</option>
                                    {
                                        tournaments.map((val) => {
                                            return (
                                                <option value={val._id}>{val.tournamentName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", width: "30%", }}>
                                <input type="text" style={{ padding: "3px", border: "solid gray 1px", color: "gray", borderRadius: "3px" }} placeholder="Fixture ID" onChange={handleFixture} name="fixtureID" />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", width: "30%", }}>
                                <input type="submit" value="search" style={{ padding: "5px", border: "solid gray 1px", color: "gray", borderRadius: "3px", background: "#B46626", color: "white", border: "none", borderRadius: "3px" }} onClick={findFixture} />
                            </div>
                        </div>
                    </div>
                    <div className="row bg-white" style={{ borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", marginTop: "10px" }}>
                        <Grid container xs={12} spacing={2} style={{ marginTop: "40px", margin: "auto" }}>
                            <Grid item xs={6}>
                                <h6 style={{ textAlign: "center" }}>Total Players</h6>
                                <div className={classes.totalPlayers}>
                                    {
                                        activePlayers.map((val) => {
                                            const name = `${val.firstName} ${val.middleName} ${val.lastName}`
                                            const playerImage = `${process.env.REACT_APP_DOMAIN}/playersImages/${val.image}`
                                            return (
                                                <div className={classes.singleAvalablePlayer}>
                                                    <Avatar className={classes.singleAvalablePlayerAvature} src={playerImage} />
                                                    <span className={classes.singleAvalablePlayerName}>{name}</span>
                                                    <input className={classes.singleAvalablePlayerCheckbox} type="checkbox" value={val._id} onChange={handleActivePlayers} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div style={{ textAlign: "center" }}><span>{activePlayers.length}/{avalablePlayers.length}</span></div>
                            </Grid>
                            <Grid item xs={6} >
                                <h6 style={{ textAlign: "center" }}>{teamName}</h6>
                                <div className={classes.totalPlayers}>
                                    {
                                        avalablePlayers.map((val) => {
                                            const playerImage = `${process.env.REACT_APP_DOMAIN}/playersImages/${val.image}`
                                            return (
                                                <div className={classes.singleAvalablePlayer}>
                                                    <Avatar className={classes.singleAvalablePlayerAvature} src={playerImage} />
                                                    <span className={classes.singleAvalablePlayerName}>{val.firstName} {val.middleName} {val.lastName}</span>
                                                    <input className={classes.singleAvalablePlayerCheckbox} value={val._id} onChange={handleChecked} type="checkbox" size="lg" />
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div style={{ textAlign: "center" }}><span>{avalablePlayers.length}/{activePlayers.length}</span></div>
                            </Grid>
                            {
                                team ?
                                    <button style={{ border: "none", padding: "10px 40px", color: "white", background: "#007BFF", marginLeft: "auto", marginRight: "20px", marginBottom: "30px", borderRadius: "5px", fontSize: "20px" }} onClick={handleTeams}>Save To Home Team</button> :
                                    <button style={{ border: "none", padding: "10px 40px", color: "white", background: "#007BFF", marginLeft: "auto", marginRight: "20px", marginBottom: "30px", borderRadius: "5px", fontSize: "20px" }}>Save To Away Team</button>
                            }
                        </Grid>
                    </div>
                </div>
            </section>
        </>
    )
}
export default AddTeamPlayers