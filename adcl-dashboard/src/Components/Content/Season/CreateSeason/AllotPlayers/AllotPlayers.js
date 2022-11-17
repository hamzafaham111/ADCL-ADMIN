import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../../Breadcrumb'
import axios from 'axios'


const AllotPlayers = (Props) => {

    const [data, setData] = useState([]);
    const [seasonID, setSeasonID] = useState("");
    const [categories, setCategories] = useState([])
    const [categoryPlayers, setCategoryPlayers] = useState([])
    const [seasonTeams, setSeasonTeams] = useState([]);
    const [summary, setSummary] = useState({});
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [selectedCategory, setSelectedCategories] = useState('');
    const [buyingPoints, setBuyingPoints] = useState()
    const [buyingTeam, setBuyingTeam] = useState();
    const [totalPlayersBaught, setTotalPlayersBaught] = useState(0);
    const handleSeason = async (e) => {
        e.preventDefault()
        setSeasonID(e.target.value)
        const data = {
            seasonID: e.target.value
        }
        await axios.post(`${process.env.REACT_APP_DOMAIN}/get-season-players`, data).then((res) => {
            setCategories(res.data.data.categories);
        })
    }
    const handlePlayers = async (e) => {
        setSelectedCategories(e.target.value)
        await axios.get(`${process.env.REACT_APP_DOMAIN}/categorie-players`, {
            headers: {
                seasonID: seasonID,
                categoryName: e.target.value
            }
        }).then((res) => {
            setCategoryPlayers(res.data.players);
            setSeasonTeams(res.data.teams)
        })
    }
    const handleSummery = (e) => {
        setBuyingTeam(e.target.value)
        const team = seasonTeams.find((val) => {
            return val.teamName == e.target.value;
        })
        setSummary(team);
        setTotalPlayersBaught(team.players.length);
    }
    const handleChange = () => {

    }
    const allotPlayer = async () => {
        const data = {
            seasonID,
            selectedCategory,
            selectedPlayer,
            buyingPoints,
            buyingTeam
        }
        await axios.post(`${process.env.REACT_APP_DOMAIN}/allot-player`, data).then((res) => {
            setSummary(res.data.data);
            setTotalPlayersBaught(res.data.data.players.length);
        })
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/seasons`).then((res) => {
            setData(res.data.data);
        })
    })
    return (<>
        <Breadcrumb t={Props.t} />
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2 p-2">
                    <div style={{ width: "100%", padding: "10px", background: "white", borderRadius: "10px" }}>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            <div style={{ margin: "5px", display: "flex", flexDirection: "column", background: "#F0F0F0", textAlign: "center", padding: "5px 30px" }}>
                                <b>Team Name</b>
                                <span>{summary.teamName}</span>
                            </div>
                            <div style={{ margin: "5px", display: "flex", flexDirection: "column", background: "#F0F0F0", textAlign: "center", padding: "5px 30px" }}>
                                <b>Total Points</b>
                                <span>{summary.teamPoints}</span>
                            </div>
                            <div style={{ margin: "5px", display: "flex", flexDirection: "column", background: "#F0F0F0", textAlign: "center", padding: "5px 30px" }}>
                                <b>Remaning Points</b>
                                <span>{summary.remaningPoints}</span>
                            </div>
                            <div style={{ margin: "5px", display: "flex", flexDirection: "column", background: "#F0F0F0", textAlign: "center", padding: "5px 30px" }}>
                                <b>Total Players Baught</b>
                                <span>{totalPlayersBaught}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "100%" }}>

                        <div style={{ width: "100%", borderRadius: "10px", padding: "10px 0 10px 0", display: "flex", flexWrap: "wrap", flexDirection: "row", alignItems: "center", background: "white", margin: "10px 0 10px" }}>
                            <div style={{ display: "flex", flexDirection: "column", width: "300px", margin: "10px" }}>
                                <label style={{ fontWeight: "500" }}>Select Season</label>
                                <select style={{ padding: "3px", outline: "none" }} onChange={handleSeason}>
                                    <option value="">--select season--</option>
                                    {
                                        data.map((val) => {
                                            return (
                                                <option value={val._id} name={val.name}>{val.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", width: "300px", margin: "10px" }}>
                                <label style={{ fontWeight: "500" }}>Select Category</label>
                                <select style={{ padding: "3px", outline: "none" }} onChange={handlePlayers}>
                                    <option>--select category--</option>
                                    {
                                        categories.map((val) => {
                                            return (<option value={val.categoryName}>{val.categoryName}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", width: "300px", margin: "10px" }}>
                                <label style={{ fontWeight: "500" }}>Select Player</label>
                                <select style={{ padding: "3px", outline: "none" }} onChange={(e) => setSelectedPlayer(e.target.value)}>
                                    <option>--select player--</option>
                                    {
                                        categoryPlayers.map((val) => {
                                            return (
                                                <option value={val._id}>{val.firstName} {val.middleName} {val.lastName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", width: "300px", margin: "10px" }}>
                                <label style={{ fontWeight: "500" }}>Buying Points</label>
                                <input type='text' placeholder='example: 100' onChange={(e) => { setBuyingPoints(e.target.value) }} />
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", width: "300px", margin: "10px" }}>
                                <label style={{ fontWeight: "500" }}>Select Teams</label>
                                <select style={{ padding: "3px", outline: "none" }} onChange={handleSummery}>
                                    <option>--select team--</option>
                                    {
                                        seasonTeams.map((val) => {
                                            return (
                                                <option value={val.teamName}>{val.teamName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div style={{}}>
                            <button onClick={allotPlayer} style={{ border: "none", color: "white", background: "blue", padding: "5px 20px" }}>Allot Player</button>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default AllotPlayers