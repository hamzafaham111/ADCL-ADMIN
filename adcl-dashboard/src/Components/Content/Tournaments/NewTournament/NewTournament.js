import { Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import Breadcrumb from './../../Breadcrumb'
import useStyles from './Style'
import "react-datepicker/dist/react-datepicker.css";
import AddTages from './AddTages/AddTages';
import axios from 'axios'
const NewTournament = (Props) => {
    const classes = useStyles();
    const [data, setData] = useState({
        tournamentName: "",
        startDate: "",
        finishDate: "",
        status: "",
        internalExternal: "",
        city: "",
        locationDetails: "",
        locationMapLink: "",
    });
    const [tags, setTags] = useState([])
    const handleData = (e) => {
        const { name, value } = e.target;
        setData((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }
    const sendData = async (e) => {
        e.preventDefault()
        alert(tags);
        axios.post(`${process.env.REACT_APP_DOMAIN}/add-new-tournament`, { data, tags }).then((res) => {
            setData({
                tournamentName: "",
                startDate: "",
                finishDate: "",
                status: "",
                internalExternal: "",
                city: "",
                locationMapLink: "",
                locationDetails: ""
            })
            setTags([])
        }).catch((err) => {
            console.log("did not get good response from add new tournament route");
        })
    }
    return (
        <>
            <Breadcrumb t={Props.t} headerLine="Please Fill All The Information Correctly To Add New Tournament" in={Props.in} link={Props.link} />
            <section className="content">
                <div className="container-fluid">
                    <div className="row" style={{}}>
                        <div className={classes.AddTournamentRoot}>
                            <div class="card-header bg-primary">
                                <h3 class="card-title">Add New Tournament</h3>
                            </div>
                            <div className={classes.addTournament}>
                                <form>
                                    <Grid container item spacing={2}>
                                        <Grid item sm={4} style={{ display: "flex", flexDirection: "column" }}>
                                            <label style={{ fontWeight: "600" }}>Tournament Name</label>
                                            <input className={classes.addTournamentInput} value={data.tournamentName} name="tournamentName" onChange={handleData} type="text" placeholder="Enter Name" />
                                        </Grid>
                                        <Grid item sm={4} style={{ display: "flex", flexDirection: "column" }}>
                                            <label style={{ fontWeight: "600" }}>Start Date</label>
                                            <input className={classes.addTournamentInput} value={data.startDate} name="startDate" onChange={handleData} type="date" placeholder="Enter Name" />
                                        </Grid>
                                        <Grid item sm={4} style={{ display: "flex", flexDirection: "column" }}>
                                            <label style={{ fontWeight: "600" }}>Finishing Date</label>
                                            <input className={classes.addTournamentInput} value={data.finishDate} name="finishDate" onChange={handleData} type="date" placeholder="Enter Name" />
                                        </Grid>
                                        <Grid item sm={4} style={{ display: "flex", flexDirection: "column" }}>
                                            <label style={{ fontWeight: "600" }}>Status</label>
                                            <select className={classes.addTournamentInput} value={data.status} name="status" onChange={handleData}>
                                                <option selected="selected">-- Select Batting Style --</option>
                                                <option value="End">End</option>
                                                <option value="Continue">Continue</option>
                                                <option value="Comming Soom">Comming Soom</option>
                                            </select>
                                        </Grid>
                                        <Grid item sm={4} style={{ display: "flex", flexDirection: "column" }}>
                                            <label style={{ fontWeight: "600" }}>Internal/External</label>
                                            <select className={classes.addTournamentInput} value={data.internalExternal} name="internalExternal" onChange={handleData}>
                                                <option selected="selected" className={classes.addTournamentInput}>-- Select Internal/External --</option>
                                                <option value="Internal">Internal</option>
                                                <option value="External">External</option>
                                                <option value="Both<">Both</option>
                                            </select>
                                        </Grid>
                                        <Grid item sm={4} style={{ display: "flex", flexDirection: "column" }}>
                                            <label style={{ fontWeight: "600" }}>City</label>
                                            <select className={classes.addTournamentInput} value={data.city} name="city" onChange={handleData}>
                                                <option selected="selected" >-- Select City --</option>
                                                <option value="Lahore">Lahore</option>
                                                <option value="Karachi">Karachi</option>
                                                <option value="Islamabad">Islamabad</option>
                                            </select>
                                        </Grid>
                                        <Grid item sm={4} style={{ display: "flex", flexDirection: "column" }}>
                                            <label style={{ fontWeight: "600" }}>Location Map Link</label>
                                            <input type="locationMapLink" className={classes.addTournamentInput} placeholder="Location Map Link" value={data.locationMapLink} name="locationMapLink" onChange={handleData} />
                                        </Grid>
                                        <Grid item sm={4} style={{ display: "flex", flexDirection: "column" }}>
                                            <label style={{ fontWeight: "600" }}>Location Details</label>
                                            <input type="locationDetails" className={classes.addTournamentInput} placeholder="Location Name" value={data.locationDetails} name="locationDetails" onChange={handleData} />
                                        </Grid>
                                        <Grid iteme sm={12}>
                                            <AddTages tags={setTags} />
                                        </Grid>
                                    </Grid>
                                    <div>
                                        <Button variant='contained' onClick={sendData} style={{ marginTop: "20px", background: "#007BFF", color: "white" }}> Create Tournament</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NewTournament