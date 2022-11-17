import { Avatar, Checkbox, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import Breadcrumb from '../../Breadcrumb'
import Information from './Information/Information'
import Categories from './Categories/Categories'
import useStyles from './Style'
import PlayersToCategory from './PlayersToCategory/PlayersToCategory'
import AddTeams from './SeasonTeams/AddTeams'
const NewSeason = (Props) => {
    const classes = useStyles();
    var [avalablePlayers, setAvalablePlayers] = useState([" "])
    const [step, setStep] = useState(1);
    const handleChange = (e) => {
        alert(avalablePlayers)
        avalablePlayers.map((val, index) => {
            if (avalablePlayers.includes(e.target.value)) {
                setAvalablePlayers(avalablePlayers)
            } else {
                setAvalablePlayers([...avalablePlayers, e.target.value])
            }
        })
    }
    return (
        <>
            <Breadcrumb t={Props.t} in={Props.in} link={Props.link} />
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className='col'>
                            <div style={{ background: "white", padding: "10px 0 20px 10px" }}><span style={{ color: "lightgray", cursor: "pointer", fontWeight: "600" }} onClick={() => { setStep(1) }}>Information</span>--<span style={{ color: "blue", cursor: "pointer", fontWeight: "600", color: "lightgray", }} onClick={() => { setStep(2) }}>Categories</span>--<span style={{ color: "blue", cursor: "pointer", fontWeight: "600", color: "lightgray", }} onClick={() => { setStep(3) }}>Add Teams</span>---<span style={{ color: "blue", cursor: "pointer", fontWeight: "600", color: "lightgray", }} onClick={() => { setStep(4) }}>Players Categories</span></div>
                            <div className={classes.createSeasonRoot}>
                                {
                                    step === 1 ? <><Information cb={setStep} /></> : step === 2 ? <Categories cb={setStep} /> : step === 3 ? <AddTeams cb={setStep} /> : step === 4 ? <PlayersToCategory /> : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NewSeason