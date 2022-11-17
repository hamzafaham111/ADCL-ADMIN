import { Avatar } from '@material-ui/core';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const PlayersToCategory = () => {
    const [seasons, setSeasons] = useState([]);
    const [seasonID, setSeasonID] = useState([]);
    const [categories, setCategories] = useState([])
    const [playersToCategory, setPlayersToCategory] = useState([])
    const [players, setPlayers] = useState([])
    const navagate = useNavigate();
    const [values, setValues] = useState({
        playerID: "",
        category: "",
    })
    const handleSeason = async (e) => {
        e.preventDefault()
        setSeasonID(e.target.value)
        const data = {
            seasonID: e.target.value
        }

        await axios.post(`${process.env.REACT_APP_DOMAIN}/get-season-players`, data).then((res) => {
            setPlayers(res.data.data.players);
            setCategories(res.data.data.categories);
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const addPlayersToCategories = async (e) => {
        const playerData = players.find((val) => {
            return val._id === values.playerID
        })
        const name = `${playerData.firstName} ${playerData.middleName} ${playerData.lastName}`
        setPlayersToCategory([...playersToCategory, {
            addedToCategoryPlayerId: values.playerID,
            playerImage: playerData.image,
            playerName: name,
            category: values.category
        }])
    }
    const sendData = async () => {
        const data = {
            seasonID,
            playersToCategory
        }
        await axios.post(`${process.env.REACT_APP_DOMAIN}/player-to-category`, data).then((res) => {
            navagate(`/dashboard/seasons/season-details/${seasonID}`)
        })
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/seasons`).then((res) => {
            setSeasons(res.data.data);
        });
    }, [])
    return (
        <div>
            <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center", }}>
                <span style={{ fontSize: "23px", fontWeight: "bold" }}>Players to Categories</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                <select id="season" className="form-control select2 m-2" name='status' onChange={handleSeason}>
                    <option selected="selected">-- Select Season --</option>
                    {
                        seasons.map((val) => {
                            return (
                                <option value={val._id}>{val.name}</option>
                            )
                        })
                    }
                </select>

                <select id="player" className="form-control select2 m-2" name='playerID' onChange={handleChange}>
                    <option selected="selected">-- Select Player --</option>
                    {
                        players.map((val) => {
                            const name = `${val.firstName} ${val.middleName} ${val.lastName}`
                            return (
                                <option style={{
                                }} value={val._id}>{name}</option>
                            )
                        })
                    }
                </select>

                <select id="category" className="form-control select2 m-2" name='category' onChange={handleChange}>
                    <option selected="selected">-- Select Category --</option>
                    {
                        categories.map((val) => {
                            return (<option value={val.categoryName}>{val.categoryName}</option>)
                        })
                    }
                </select>
                <div style={{ width: "150px", display: "flex", height: "100%", }}>
                    <button onClick={addPlayersToCategories} className='btn m-2' style={{ width: "150px", border: "none", background: "blue", color: "white", cursor: "pointer", borderRadius: "4px" }}>Add Player</button>
                </div>
            </div >
            <div style={{ marginTop: "30px", maxHeight: "500px", width: "50%", padding: "10px", overflow: "auto" }}>
                {
                    playersToCategory.map((val) => {
                        const image = `${process.env.REACT_APP_DOMAIN}/playersImages/${val.playerImage}`
                        return (
                            <div style={{ marginBottom: "10px", display: "flex", flexDirection: "row", width: "100%", alignItems: "center", border: "solid green 1px", padding: "7px", borderRadius: "10PX" }}>
                                <span style={{ fontWeight: "bold", marginRight: "10px" }}>1</span>
                                <Avatar style={{ marginRight: "10px" }} src={image} />
                                <span>{val.playerName}</span>
                                <span style={{ marginLeft: "auto", fontWeight: "600" }}>{val.category}</span>
                            </div>
                        )
                    })
                }

            </div>
            <div style={{ display: "flex", justifyContent: "end", marginTop: "20px" }}>
                <button onClick={sendData} style={{
                    border: "none",
                    borderRadius: "5px",
                    background: "blue",
                    color: "white",
                    fontWeight: "700",
                    padding: "10px 40px",
                    cursor: "pointer",
                }}>Save</button>
            </div>
        </div >
    )
}

export default PlayersToCategory