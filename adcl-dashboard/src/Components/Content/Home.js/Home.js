import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../Breadcrumb'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import GroupIcon from '@material-ui/icons/Group';
import ExtensionIcon from '@material-ui/icons/Extension';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import axios from 'axios';
const Home = (Props) => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/home-data`).then((res) => {
            setData(res.data.data);
        })
    }, [])

    return (
        <div>
            {/* Content Header (Page header) */}
            <Breadcrumb t={Props.t} />
            {/* /.content-header */}
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    {/* Small boxes (Stat box) */}
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            {/* small box */}
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>{data.numberOfPlayers}</h3>
                                    <p>Total Players</p>
                                </div>
                                <div className="icon">
                                    <DirectionsRunIcon />
                                </div>
                                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                        {/* ./col */}
                        <div className="col-lg-3 col-6">
                            {/* small box */}
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3>53<sup style={{ fontSize: 20 }}></sup></h3>
                                    <p>Teams</p>
                                </div>
                                <div className="icon">
                                    <GroupIcon />
                                </div>
                                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                        {/* ./col */}
                        <div className="col-lg-3 col-6">
                            {/* small box */}
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3>{data.numberOfTournaments}</h3>
                                    <p>Tournments</p>
                                </div>
                                <div className="icon">
                                    <ExtensionIcon />
                                </div>
                                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                        {/* ./col */}
                        <div className="col-lg-3 col-6">
                            {/* small box */}
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3>65</h3>
                                    <p>Matches</p>
                                </div>
                                <div className="icon">
                                    <SportsKabaddiIcon />
                                </div>
                                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                            </div>
                        </div>
                        {/* ./col */}
                    </div>
                    {/* /.row */}
                    {/* Main row */}






                    {/* /.row (main row) */}
                </div>{/* /.container-fluid */}
            </section>
            {/* /.content */}
        </div>
    )
}

export default Home