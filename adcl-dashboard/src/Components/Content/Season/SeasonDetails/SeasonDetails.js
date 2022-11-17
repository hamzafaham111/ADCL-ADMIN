import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../Breadcrumb'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Banner from './Assets/Banner.jpg'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Avatar, Grid } from '@material-ui/core'
const SeasonDetails = (Props) => {
    const { seasonID } = useParams()
    const [data, setData] = useState({})
    const [playersToCategory, setPlayerToCategory] = useState([])
    const [categories, setCategories] = useState([])
    const [length, setLength] = useState()
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        const ID = {
            seasonID
        }
        axios.post(`${process.env.REACT_APP_DOMAIN}/season-details`, ID).then((res) => {
            setData(res.data.data)
            setPlayerToCategory(res.data.playersToCategories);
            setTeams(res.data.data.teams);
            setCategories(res.data.data.categories);
            setLength(res.data.data.avalablePlayers.length)
        })
    }, [])
    return (
        <>
            <Breadcrumb t={Props.t} in={Props.in} link={Props.link} />
            <div style={{ margin: "15px" }}>
                <div style={{ backgroundImage: `linear-gradient(0deg, rgba(19 187 9 / 24%), rgba(255 0 150 / 35%)), url(${Banner}) `, borderRadius: "10px", width: "100%", height: "40vh", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover", }}>
                    <div style={{ float: "Right", marginTop: "10px", marginRight: "10px" }}><FiberManualRecordIcon style={{ color: "green", fontSize: "18px" }} /><span style={{ color: "white", fontWeight: "bold" }}>{data.status}</span></div>
                    <div style={{
                        display: "flex", flexDirection: "column", height: "100%", justifyContent: "end", padding: "0 0 30px 20px",
                    }}>
                        <span style={{ color: "white", fontSize: "45px", fontWeight: "bolder" }}>{data.name}</span>
                        <span style={{ color: "white", fontSize: "20px" }}>{data.startDate}  to  {data.finishDate}</span>
                    </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <span style={{ background: "#DF7120", color: "white", padding: "10px 20px", fontWeight: "bold", borderRadius: "7px" }}><span style={{ marginRight: "10px" }}>Total Players:</span>{length}</span>
                </div>
                <div>
                    <div style={{ textAlign: "Center", marginTop: "50px" }}>
                        <span style={{ fontWeight: "bold", paddingBottom: "5px", fontSize: "22px", borderBottom: "solid green 4px" }}>Categories</span>
                        <div style={{ marginTop: "20px", display: "flex", justifyContent: "CENTER" }}>
                            {
                                categories.map((val) => {
                                    return (
                                        <div style={{ background: "#F7D000", margin: "10px", display: "flex", flexDirection: "column", width: "200px", padding: "20px" }}>
                                            <span style={{ fontWeight: "bold", fontSize: "20px", }}>{val.categoryName}</span>
                                            <span>Points: {val.points}</span>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "20px" }}>
                    <span style={{ fontWeight: "bold", paddingBottom: "5px", fontSize: "22px", borderBottom: "solid green 4px" }}>Teams</span>
                    <div className='row' style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        {
                            teams.map((val) => {
                                const img = `${process.env.REACT_APP_DOMAIN}/teamsLogos/${val.teamLogo}`
                                return (
                                    <div className="col-sx-6 col-sm-4 col-md-3">
                                        <div style={{ background: "white", paddingBottom: "10px", marginBottom: "10px", fontWeight: "600" }}>
                                            <img style={{ objectFit: "cover", width: "200px", height: "200px", padding: "10px" }} src={img} alt="Card image cap" />
                                            <div style={{ marginBottom: "10px" }}>
                                                <span style={{ fontSize: "1.5rem" }}>{val.teamName}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "20px" }}>
                        <span style={{ fontWeight: "bold", paddingBottom: "5px", fontSize: "22px", borderBottom: "solid green 4px" }}>Players</span>
                    </div>
                    <Grid container>
                        {
                            playersToCategory.map((val) => {
                                const image = `${process.env.REACT_APP_DOMAIN}/playersImages/${val.singlePlayer.image}`
                                return (
                                    <Grid item xs={4}>
                                        <div style={{ display: "flex", border: "solid green 1px", alignItems: "center", margin: "5px 20px", padding: "4px 10px", borderRadius: "4px" }}>
                                            <Avatar src={image} /><span style={{ marginLeft: "20px" }}>{val.singlePlayer.firstName} {val.singlePlayer.middleName} {val.singlePlayer.lastName}</span>
                                            <span style={{ fontWeight: "bold", marginLeft: "auto" }}>{val.category}</span>
                                        </div>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default SeasonDetails