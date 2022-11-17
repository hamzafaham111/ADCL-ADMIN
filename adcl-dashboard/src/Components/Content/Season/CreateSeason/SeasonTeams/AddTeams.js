import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';

const AddTeams = (Props) => {
    const [seasons, setSeasons] = useState([]);
    const [teams, setTeams] = useState([])
    const [logo, setLogo] = useState('');
    const [teamName, setTeamName] = useState('')
    const [seasonID, setSeasonID] = useState("");
    const handleImage = (e) => {
        setLogo(e.target.files[0])
    }
    const handleSeason = (e) => {
        setSeasonID(e.target.value);
        const season = seasons.find((val) => {
            return val._id == e.target.value;
        })
        setTeams(season.teams)
    }

    const deleteTeamFromSeason = async (index) => {
        const afterDelete = teams.filter((val, i) => {
            return i != index
        })
        setTeams(afterDelete)
        const data = {
            seasonID,
            afterDelete,
        }
        await axios.post(`${process.env.REACT_APP_DOMAIN}/delete-season-team`, data).then((res) => {
            setTeams(res.data.teams);
        })
    }
    const sendData = async () => {
        const seasonTeam = new FormData()
        seasonTeam.append('logo', logo);
        seasonTeam.append('teamName', teamName);
        seasonTeam.append('seasonID', seasonID)
        await axios.post(`${process.env.REACT_APP_DOMAIN}/add-season-teams`, seasonTeam).then((res) => {
            setTeams(res.data.data);
        });
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/seasons`).then((res) => {
            setSeasons(res.data.data);
            console.log(res.data.data);
        });
    }, [])
    return (
        <div>
            <div style={{ height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "23px", fontWeight: "bold" }}>Add Teams</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                <select id="season" className="form-control select2 m-2" name='status' onClick={handleSeason}>
                    <option selected="selected">-- Select Season --</option>
                    {
                        seasons.map((val) => {
                            return (
                                <option value={val._id} >{val.name}</option>
                            )
                        })
                    }
                </select>
                <label form='logo' className="form-control select2 m-2 text-center" style={{ color: "gray", fontWeight: "400" }}>Change Profile
                    <input type="file" id='logo' onChange={handleImage} name='logo' style={{ display: "none" }} />
                </label>
                <input type="type" id="teamName" name="teamName" onChange={e => setTeamName(e.target.value)} placeholder='Team Name' className="form-control select2 m-2" />
                <div style={{ width: "150px", display: "flex", height: "100%", }}>
                    <button onClick={sendData} className='btn m-2' style={{ width: "150px", border: "none", background: "blue", color: "white", cursor: "pointer", borderRadius: "4px" }}>Add Team</button>
                </div>
            </div >
            <div style={{ paddingLeft: "10px", marginTop: "20px" }}>
                {
                    teams.map((val, index) => {
                        return (
                            <div style={{ display: "flex", marginTop: "10px", flexDirection: "row", alignItems: "center", border: "solid gray 1px", width: "35%", borderRadius: "5px", padding: "5px 5px" }}>
                                <span style={{ marginRight: "10px" }}><Avatar src={`${process.env.REACT_APP_DOMAIN}/teamsLogos/${val.teamLogo}`} /></span>
                                <span>{val.teamName}</span>
                                <span style={{ marginLeft: "auto" }}><CancelIcon style={{ color: "red", cursor: "pointer" }} onClick={() => { deleteTeamFromSeason(index) }} /></span>
                            </div>
                        )
                    })
                }
            </div>
            <div style={{ display: "flex", justifyContent: "end", marginTop: "20px" }}>
                <button onClick={() => { Props.cb(4) }} style={{
                    border: "none",
                    borderRadius: "5px",
                    background: "blue",
                    color: "white",
                    fontWeight: "700",
                    padding: "10px 40px",
                    cursor: "pointer",
                }}>Next</button>
            </div>
        </div>
    )
}

export default AddTeams