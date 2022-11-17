import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../Breadcrumb'
import useStyles from './Style'
import AddIcon from '@material-ui/icons/Add'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Popup from '../Popup';
import CancelIcon from '@material-ui/icons/Cancel';
import DataTable from 'react-data-table-component'
const TournamentDetails = (Props) => {
    const classes = useStyles();
    const [buttonPopup, setButtonPopup] = useState(false)
    const { tournamentID } = useParams();
    const [fixtures, setFixtures] = useState([])
    const [data, setData] = useState({});
    const [newTeam, setNewTeam] = useState();
    const [teams, setTeams] = useState([])
    // const [matchID, SetMatchID] = useState("");
    const tournament_ID = {
        _id: tournamentID
    }
    let matchID = fixtures.lenght + 1;
    let [fixture, setFixture] = useState({
        homeTeam: "",
        awayTeam: "",
        playingDate: "",
    })
    const columns = [
        {
            name: "Match ID",
            selector: row => row.matchID
        },
        {
            name: "Home Team",
            selector: row => row.homeTeam,
        },
        {
            name: "VS",
            selector: row => <div style={{}}>VS</div>,
        },
        {
            name: "Away Team",
            selector: row => row.awayTeam
        },
        {
            name: "Winner",
            selector: row => row.winner
        },
        {
            name: "Date",
            selector: row => row.playingDate
        },
        {
            name: "Delete",
            selector: row => <CancelIcon style={{ color: "red", cursor: "pointer", color: "#BA6A27" }} onClick={() => {
                deleteFixtureFromTournament(row.matchID)
            }} />
        },
    ]
    const handleFixtures = (e) => {
        const { name, value } = e.target;
        setFixture((preVaue) => {
            return {
                ...preVaue,
                [name]: value
            }
        })
    }

    const addFixture = async () => {
        const data = {
            fixture,
            tournamentID,
            matchID: matchID
        }
        await axios.post(`${process.env.REACT_APP_DOMAIN}/add-fixture`, data).then((res) => {
            setFixtures(res.data.fixtures);
            setButtonPopup(false)
        }).catch(() => {
            alert("couldn't add the fixture")
        })
    }
    const addTeamToTournament = async () => {
        const data = {
            tournamentID,
            newTeam
        }
        await axios.post(`${process.env.REACT_APP_DOMAIN}/add-new-team-to-tournament`, data).then((res) => {
            setTeams(res.data.teams);
            setNewTeam("")
        })
    }

    const deleteTeamFromTournament = async (index) => {
        const afterDelete = teams.filter((val, i) => {
            return i != index
        })
        setTeams(afterDelete)
        const data = {
            tournamentID,
            afterDelete,
        }
        await axios.post(`${process.env.REACT_APP_DOMAIN}/delete-team-from-tournament`, data).then((res) => {
            setTeams(res.data.teams);
        })
    }
    const deleteFixtureFromTournament = async (matchID) => {
        const afterDelete = fixtures.filter((val) => {
            return matchID != val.matchID
        })
        setFixtures(afterDelete)
        const data = {
            tournamentID,
            afterDelete,
        }
        await axios.post(`${process.env.REACT_APP_DOMAIN}/delete-fixture-from-tournament`, data).then((res) => {
            setFixtures(res.data.teams);
        })
    }
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_DOMAIN}/tournament-details-display`, tournament_ID).then((res) => {
            setData(res.data.data);
            setTeams(res.data.data.teams)
            setFixtures(res.data.data.fixtures)
        })
    }, [])
    return (
        <div>
            <Breadcrumb link={Props.link} in={Props.in} t={Props.t} />
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className={classes.tournamentDetailsRoot}>
                            <Popup trigger={buttonPopup} >
                                <div style={{
                                    zIndex: 1,
                                    position: "fixed", top: 0, bottom: 0, background: "lightGray", opacity: "95%", left: "20%", right: "0%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <div style={{
                                        margin: "20px", width: "100%", background: "white", boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                                        borderRadius: "5px"
                                    }}>
                                        <div style={{}}><CancelIcon style={{ color: "green" }} onClick={() => { setButtonPopup(false) }} /></div>
                                        <div style={{ padding: "10px", display: "flex" }}>
                                            <div style={{ width: "100%", margin: "10px 5px", }}>
                                                <label>Home Team</label>
                                                <select
                                                    style={{
                                                        padding: "5px",
                                                        fontSize: "15px",
                                                        borderRadius: "3px",
                                                        outline: "none",
                                                        background: "transparent",
                                                        width: "100%",
                                                    }}
                                                    onChange={handleFixtures}
                                                    name="homeTeam"
                                                >
                                                    <option>-- select Home Team--</option>
                                                    {
                                                        teams.map((val) => {
                                                            return (
                                                                <option value={val.team}>{val.team}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div style={{ width: "100%", margin: "10px 5px", }}>
                                                <label>Away Team</label>
                                                <select
                                                    style={{
                                                        padding: "5px",
                                                        fontSize: "15px",
                                                        borderRadius: "3px",
                                                        outline: "none",
                                                        background: "transparent",
                                                        width: "100%",
                                                    }}
                                                    onChange={handleFixtures}
                                                    name="awayTeam"
                                                >
                                                    <option>-- select Away Team--</option>
                                                    {
                                                        teams.map((val) => {
                                                            return (
                                                                <option value={val.team}>{val.team}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div style={{ width: "100%", margin: "10px 5px", }}>
                                                <label>Date</label>
                                                <input type="date"
                                                    style={{
                                                        padding: "5px",
                                                        fontSize: "15px",
                                                        borderRadius: "3px",
                                                        outline: "none",
                                                        background: "transparent",
                                                        width: "100%",
                                                        border: "solid gray 1px"
                                                    }}
                                                    name="playingDate"
                                                    onChange={handleFixtures}
                                                />
                                            </div>
                                        </div>
                                        <button onClick={addFixture} style={{ border: "none", float: "right", background: "green", color: "white", margin: "10px", padding: "3px 15px", borderRadius: "3px" }}>Add Fixture</button>
                                    </div>
                                </div>
                            </Popup>
                            <div className="card-header bg-primary w-100">
                                <h3 className="card-title">{data.tournamentName}</h3>
                            </div>
                            <div style={{
                                // padding: "20px"
                            }}>

                                <table className="table">
                                    <tbody className="border">
                                        <tr className="border">
                                            <td>
                                                <span style={{ marginRight: "15px", fontWeight: "bold", color: "gray" }}>Starting Date:</span>
                                                <span>{data.startDate}</span>
                                            </td>
                                            <td>
                                                <span style={{ marginRight: "15px", fontWeight: "bold", color: "gray" }}>Finishing Date:</span>
                                                <span>{data.finishDate}</span>
                                            </td>
                                            <td>
                                                <span style={{ marginRight: "15px", fontWeight: "bold", color: "gray" }}>Status:</span>
                                                <span>{data.status}</span>
                                            </td>
                                        </tr>
                                        <tr className="border">
                                            <td>
                                                <span style={{ marginRight: "15px", fontWeight: "bold", color: "gray" }}>Internal/External:</span>
                                                <span>{data.internalExternal}</span>
                                            </td>
                                            <td>
                                                <span style={{ marginRight: "15px", fontWeight: "bold", color: "gray" }}>City:</span>
                                                <span>{data.city}</span>
                                            </td>
                                            <td>
                                                <span style={{ marginRight: "15px", fontWeight: "bold", color: "gray" }}>Location:</span>
                                                <span>{data.locationDetails}</span>
                                            </td>
                                        </tr>
                                        <tr className="border">
                                            <td>
                                                <span style={{ marginRight: "15px", fontWeight: "bold", color: "gray" }}>Winner:</span>
                                                <span>{data.winner}</span>
                                            </td>
                                            <td>
                                                <span style={{ marginRight: "15px", fontWeight: "bold", color: "gray" }}>Runners up:</span>
                                                <span>{data.runnerUp}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div style={{ marginTop: "20px", padding: "20px" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                                    <h4 style={{ color: "gray" }}>Teams</h4>
                                    <div>
                                        <input type="Text" placeholder='Enter New Team' value={newTeam} onChange={(e) => setNewTeam(e.target.value)} style={{ fontSize: "15px", color: "light", outline: "none", padding: "2px 20px", margin: "5px", border: "solid lightgray 2px" }} />
                                        <button onClick={addTeamToTournament} style={{ background: "#BA6A27", color: "white", border: "none", padding: "3px 10px", borderRadius: "4px" }}>Add New Team</button>
                                    </div>
                                </div>
                                <div className={classes.TournamentDetailsTeamsGroup}>
                                    {teams.length == 0 ? <span style={{ fontSize: "25px", border: "solid lightGray 2px", fontWeight: "bold", color: "lightGray", textAlign: "center", marginTop: "10px" }}>Add Team ...</span> :
                                        <table className="table" style={{ marginTop: "5px" }}>
                                            <tbody className="border">
                                                <tr className="border text-bold text-gray">
                                                    <td>Team ID</td>
                                                    <td>Team Name</td>
                                                    <td style={{ textAlign: "center" }}>Remove</td>
                                                </tr>
                                                {
                                                    teams.map((val, index) => {
                                                        return (<>
                                                            <tr className="border" style={{ color: "gray" }}>
                                                                <td>{val.teamID}</td>
                                                                <td >{val.team}</td>
                                                                <td style={{ textAlign: "center" }}> <CancelIcon style={{ color: "#BA6A27", cursor: "pointer", }} onClick={() => { deleteTeamFromTournament(index) }} /></td>
                                                            </tr>
                                                        </>)
                                                    })
                                                }
                                            </tbody>
                                        </table>}
                                </div>
                                <div style={{ marginTop: "60px", }}>
                                    <div style={{ display: "flex", marginBottom: "7px", justifyContent: "space-between" }}>
                                        <h4 style={{ color: "gray" }}>Matches</h4>
                                        <button onClick={() => { setButtonPopup(true); }} style={{ background: "#BA6A27", color: "white", border: "none", padding: "3px 10px", borderRadius: "4px" }}>Add New Fixture <AddIcon /></button>
                                    </div>
                                    <DataTable style={{ zIndes: -1 }} columns={columns} data={fixtures} pagination highlightOnHover fixedHeaderScrollHeight='300px' />
                                </div>
                            </div>





                            <div className={classes.TournamentDetailsSponsers}>
                                <h4 style={{ color: "gray" }}>Sponsers</h4>
                                <ul style={{ borderRadius: "10px", padding: "10px 0", display: "flex", listStyle: "none", flexWrap: "wrap" }}>
                                    {
                                        data.sponsers ?
                                            data.sponsers.map((val) => {
                                                return (<>
                                                    <li className={classes.singleSponser} style={{}}>{val}</li>
                                                </>)
                                            }) : <span>No Sponsers here Currently</span>
                                    }
                                </ul>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>

    )
}

export default TournamentDetails