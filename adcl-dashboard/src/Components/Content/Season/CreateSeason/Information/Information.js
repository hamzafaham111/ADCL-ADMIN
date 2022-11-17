import { Avatar, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import useStyles from './Style';
import axios from 'axios'
const Information = (Props) => {

    const classes = useStyles();
    const [avalablePlayers, setAvalablePlayers] = useState([])
    const [avalablePlayersDB, setAvalablePlayersDB] = useState([])
    const [activePlayers, setActivePlayers] = useState([]);
    const [seasonDetails, setSeasonDetails] = useState({
        name: "",
        startDate: "",
        finishDate: "",
        status: "",
        teamPoints: "",
    })
    const handleChecked = (e) => {
        const filteredPlayers = avalablePlayers.filter(function (player) {
            return player._id !== e.target.value;
        });
        setAvalablePlayers(filteredPlayers)
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeasonDetails((preValue) => {
            return {
                ...preValue,
                [name]: value

            }
        })
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
    const sendData = async (e) => {
        e.preventDefault()
        alert(seasonDetails.startDate)
        const data = {
            basicData: seasonDetails,
            avalablePlayers: avalablePlayersDB
        }
        await axios.post(`${process.env.REACT_APP_DOMAIN}/create-season`, data).then((res) => {
            Props.cb(2)
        }).catch(() => {

        })
    }
    const players = [
        {
            name: "Babar Azam",
        },
        {
            name: "Muhammad RIZWAN"
        },
        {
            name: "Fakhar Zaman",
        },
        {
            name: "Haider Ali"
        }, {
            name: "Muhammad Nawaz",
        },
        {
            name: "Shadab Khan",
        },
        {
            name: "Asif Ali"
        },
        {
            name: "Naseem Shah",
        },
        {
            name: "Haris Raouf"
        }, {
            name: "Shaheen Shah Afridi",
        },
    ]
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/active-players`).then((res) => {
            setActivePlayers(res.data.data);
            console.log(res.data.data);
        })
    }, [])
    return (
        <form>
            <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "23px", fontWeight: "bold" }}>New Season Information</span>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <label for="exampleInputEmail1" className='font-weight-normal'>Season Name</label>
                    <input type="text" onChange={handleChange} name="name" class="form-control" id="name" placeholder="Season Name" />
                </Grid>
                <Grid item xs={6}>
                    <label for="exampleInputEmail1" className='font-weight-normal'>Start Date</label>

                    {/* <input type="date" className={classes.creatSeasonInputs} name="startDate" placeholder='Start Date' /> */}
                    <input type="date" onChange={handleChange} name="startDate" class="form-control" id="startDate" />
                </Grid>
                <Grid item xs={6}>
                    <label for="exampleInputEmail1" className='font-weight-normal'>Finishing Date</label>
                    {/* <input type="date" className={classes.creatSeasonInputs} name="startDate" placeholder='Start Date' /> */}
                    <input type="date" onChange={handleChange} name="finishDate" class="form-control" id="finishDate" />
                </Grid>
                <Grid item xs={6}>
                    {/* <label style={{ fontWeight: "500" }}>Current Status</label>
                    <input type="text" className={classes.creatSeasonInputs} name="startDate" placeholder='Status' /> */}
                    <label className='font-weight-normal'>Season Status *</label>
                    <select id="mySelect2" class="form-control select2" name='status' onChange={handleChange}>
                        <option selected="selected">-- Select Season Status --</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Finished">Finished</option>
                    </select>
                </Grid>
                <Grid item xs={6}>
                    <label for="exampleInputEmail1" className='font-weight-normal'>Team Points</label>
                    {/* <input type="date" className={classes.creatSeasonInputs} name="startDate" placeholder='Start Date' /> */}
                    <input type="text" onChange={handleChange} name="teamPoints" class="form-control" id="teamPoints" placeholder="Team Points" />
                </Grid>
            </Grid>

            {/* <div>

            </div> */}



            <Grid container xs={12} spacing={2} style={{ marginTop: "40px" }}>
                <Grid item xs={6}>
                    <h6>Total Players</h6>
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
                    <h6>Avalable Players</h6>
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
                <button style={{ border: "none", padding: "10px 40px", color: "white", background: "#007BFF", marginLeft: "auto", marginRight: "20px", marginBottom: "30px", borderRadius: "5px", fontSize: "20px" }} onClick={sendData}>Next</button>

            </Grid>
        </form >
    )
}

export default Information