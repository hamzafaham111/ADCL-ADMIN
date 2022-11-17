import React, { useState, useEffect } from 'react'
import Breadcrumb from '../Breadcrumb'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './Style'
import VisibilityIcon from '@material-ui/icons/Visibility';
import DataTable from 'react-data-table-component'
import axios from 'axios'
const Seasons = (Props) => {
    const classes = useStyles();
    const [search, setSearch] = useState();
    const [filterData, setFilterData] = useState([])
    const [data, setData] = useState([])
    const column = [
        {
            name: "SeasonID",
            selector: row => row.seasonID,
            grow: 2
        },
        {
            name: "Season Name",
            selector: row => row.name,
            grow: 2
        },
        {
            name: "Start Date",
            selector: row => row.startDate,
        },
        {
            name: "Status",
            selector: row => row.status,
        },
        {
            name: "View",
            selector: row => <Link to={`/dashboard/seasons/season-details/${row._id}`}><VisibilityIcon style={{ color: "#1491A4" }} /></Link>,
        },
        {
            name: "Edit",
            selector: row => <EditIcon style={{ color: "green" }} />,
        },
        {
            name: "Delete",
            selector: row => <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => { deleteSeason(row._id) }} />,
        },
    ]


    const afterDeleteSeason = (ID) => {
        const afterSeasonDelete = filterData.filter((val) => {
            return val._id != ID;
        });
        setFilterData(afterSeasonDelete)
    }
    const deleteSeason = async (playerID) => {
        await axios.delete(`${process.env.REACT_APP_DOMAIN}/delete-season`, {
            headers: {
                id: playerID
            }
        }).then((res) => {
            afterDeleteSeason(playerID);
        })
    }



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/display-seasons`).then((res) => {
            setData(res.data.data);
            setFilterData(res.data.data)
        })
    }, [])
    useEffect(() => {
        const result = data.filter((tournament) => {
            return tournament.name.toLowerCase().match(search.toLowerCase());
        })
        setFilterData(result)
    }, [search])
    return (
        <>
            <Breadcrumb t={Props.t} />
            <section className="content">
                <div className="container-fluid">
                    {/* Small boxes (Stat box) */}
                    <div className="row">
                        <div style={{ width: "100%", margin: "10px 0", display: "flex", alignItems: "center" }}>
                            <Link to="/dashboard/seasons/create-new-season">
                                <Button variant="contained" style={{ background: "#007BFF", color: "white" }}>Create New Season<AddIcon style={{ marginLeft: "10px", }} /></Button>
                            </Link>
                            <span style={{ margin: "0 10px", padding: "0 20px", background: "#BA6A27", borderRadius: "5px", color: "white", height: "100%", display: "flex", alignItems: "center" }}>Totle Seasons {data.length}</span>
                        </div>
                        <div style={{ overflow: "scroll", height: "500px", width: "100%", }}>
                            <DataTable
                                columns={column}
                                data={filterData}
                                pagination
                                subHeader
                                subHeaderComponent={
                                    <input type="text"
                                        style={{ padding: "5px 10px", border: "solid lightgray 1px", borderRadius: "5px", color: "lightgray" }}
                                        placeholder='search season Name'
                                        value={search}
                                        onChange={(e) => { setSearch(e.target.value) }}
                                        className='w-25'
                                    />
                                }
                            />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Seasons