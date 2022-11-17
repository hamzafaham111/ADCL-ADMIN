import React, { useEffect, useState } from 'react'
import Breadcrumb from './../Breadcrumb'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './Style'
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios'
import DataTable from 'react-data-table-component'


const Tournament = (Props) => {
    const classes = useStyles();
    const [data, setData] = useState([])
    const [search, setSearch] = useState();
    const [filterData, setFilterData] = useState([])
    const [pending, setPending] = useState(true)
    const column = [
        {
            name: "ID",
            selector: row => row.tournamentID
        },
        {
            name: "Tournament",
            selector: row => row.tournamentName,
            grow: 2
        },
        {
            name: "Year",
            selector: row => row.startDate.slice(0, 4)
        },
        {
            name: "Status",
            selector: row => row.status,
        },
        {
            name: "Internal/External",
            selector: row => row.internalExternal,
        },
        {
            name: "City",
            selector: row => row.city,
        },
        {
            name: " View",
            selector: row => <Link to={`/dashboard/tournaments/tournament-details/${row._id}`}><VisibilityIcon style={{ color: "#1491A4" }} /></Link>
        },
        {
            name: "Edit",
            selector: row => <EditIcon style={{ color: "green" }} />,
        },
        {
            name: "Delete",
            selector: row => <DeleteIcon style={{ color: "red", cursor: "pointer" }} onClick={() => { deleteTournament(row._id) }} />,
        },
    ]
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/display-tournaments`).then((res) => {
            setData(res.data.data)
            setFilterData(res.data.data);
            setPending(false)
        })
    }, [])
    useEffect(() => {
        const result = data.filter((tournament) => {
            return tournament.tournamentName.toLowerCase().match(search.toLowerCase())
        })
        setFilterData(result)
    }, [search])

    const afterDeletePlayer = (ID) => {
        const afterPlayerDelete = filterData.filter((val) => {
            return val._id != ID;
        });
        setFilterData(afterPlayerDelete)
    }
    const deleteTournament = async (playerID) => {
        await axios.delete(`${process.env.REACT_APP_DOMAIN}/delete-tournament`, {
            headers: {
                id: playerID
            }
        }).then((res) => {
            afterDeletePlayer(playerID);
        })
    }
    return (<>
        <Breadcrumb t={Props.t} headerLine="List ofTotal Tournaments Of ADCL Comming From Database" />
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div style={{ width: "100%", margin: "10px 0", display: "flex", alignItems: "center" }}>
                        <Link to="/dashboard/add-new-tournment">
                            <Button variant="contained" style={{ background: "#007BFF", color: "white" }}>Add New Tournament<AddIcon style={{ marginLeft: "10px", }} /></Button>
                        </Link>
                        <span style={{ margin: "0 10px", padding: "0 20px", background: "#BA6A27", borderRadius: "5px", color: "white", height: "100%", display: "flex", alignItems: "center" }}>Total Tournaments {data.length}</span>

                    </div>
                    <div style={{ width: "100%", }}>
                        <DataTable
                            columns={column}
                            data={filterData}
                            pagination
                            subHeader
                            fixedHeader
                            fixedHeaderScrollHeight='400px'
                            progressPending={pending}
                            subHeaderComponent={
                                <input type="text"
                                    style={{ padding: "5px 10px", border: "solid lightgray 1px", borderRadius: "5px", color: "lightgray" }}
                                    placeholder='Search Tournament'
                                    onChange={(e) => { setSearch(e.target.value) }}
                                    value={search}
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

export default Tournament