import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../Breadcrumb'
import useStyles from './Style'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const PlayerDetails = (Props) => {
    const classes = useStyles()
    const [data, setData] = useState({});
    const { playerID } = useParams();
    const send_user_id = {
        player_id: playerID
    }
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_DOMAIN}/player-details-display`, send_user_id).then((res) => {
            setData(res.data.data);
        }).catch((err) => {
            console.log("Some problem in getting response from from player details");
        })
    }, [])

    return (
        <div>
            <Breadcrumb link={Props.link} headerLine="Here You Find All The Information Related To The Player with ADCL " in={Props.in} t={Props.t} />
            <div className="content-header">
                <div className="container-fluid">
                    <div className="mb-2" style={{ display: "flex", flexDirection: "row", position: "relative" }}>
                        <div className={classes.profileImage} style={{ backgroundImage: `url(${process.env.REACT_APP_DOMAIN}/playersImages/${data.image})`, }}>
                            <label className={classes.changeProfile} style={{}}>
                                <snap for="profileImg">Change Profile Image</snap>
                                <input type="file" id='profileImg' style={{ display: "none" }} />
                            </label>
                        </div>
                        <div style={{ width: "100%", }}>
                            <div style={{ background: "white", margin: "10px", borderRadius: "5px", boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 8px 0px" }}>
                                <ul style={{ listStyle: "none", display: "flex", flexDirection: "row", justifyContent: "space-around", fontWeight: "bold", color: "gray" }}>
                                    <li style={{ borderBottom: "solid green 3px", padding: "4px 10px", cursor: "pointer" }}>Overview</li>
                                    <li style={{ borderBottom: "solid transparent 3px", padding: "4px 10px", cursor: "pointer" }}>Stats</li>
                                    <li style={{ borderBottom: "solid transparent 3px", padding: "4px 10px", cursor: "pointer" }}>Records</li>
                                    <li style={{ borderBottom: "solid transparent 3px", padding: "4px 10px", cursor: "pointer" }}>Matches</li>
                                    <li style={{ borderBottom: "solid transparent 3px", padding: "4px 10px", cursor: "pointer" }}>Information</li>
                                </ul>
                            </div>
                            <div>
                                <div className='row' style={{ background: "white", margin: "10px", borderRadius: "5px", boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 8px 0px" }}>
                                    <div className='col-4 ' style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                                        <span style={{ color: "gray", fontWeight: "bold", paddingBottom: "5px" }}>FULL NAME</span>
                                        <span>{data.firstName} {data.middleName} {data.lastName}</span>
                                    </div>
                                    <div className='col-4 ' style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                                        <span style={{ color: "gray", fontWeight: "bold", paddingBottom: "5px" }}>DATE OF BIRTH</span>
                                        <span>{data.DOB}</span>
                                    </div>
                                    <div className='col-4 ' style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                                        <span style={{ color: "gray", fontWeight: "bold", paddingBottom: "5px" }}>PHONE NUMBER</span>
                                        <span>{data.phone}</span>
                                    </div>
                                    <div className='col-4 ' style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                                        <span style={{ color: "gray", fontWeight: "bold", paddingBottom: "5px" }}>EMAIL</span>
                                        <span>{data.email}</span>
                                    </div>
                                    <div className='col-4 ' style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                                        <span style={{ color: "gray", fontWeight: "bold", paddingBottom: "5px" }}>NATIONALITY</span>
                                        <span>{data.nationality}</span>
                                    </div>
                                    <div className='col-4 ' style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                                        <span style={{ color: "gray", fontWeight: "bold", paddingBottom: "5px" }}>GENDER</span>
                                        <span>{data.gender}</span>
                                    </div>
                                    <div className='col-4 ' style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                                        <span style={{ color: "gray", fontWeight: "bold", paddingBottom: "5px" }}>PLAYER STATUS</span>
                                        <span>{data.playerStatus}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerDetails