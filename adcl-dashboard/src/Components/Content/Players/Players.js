import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../Breadcrumb'
import useStyles from './Style'
import { Avatar, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add'
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios'
import DataTable from 'react-data-table-component'

const Players = (Props) => {
    const [search, setSearch] = useState();
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([])
    const classes = useStyles();
    const [pending, setPending] = useState(true);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/display-players`).then((res) => {
            setData(res.data.playersData);
            setFilterData(res.data.playersData);
            setPending(false);
        }).catch((err) => {
            console.log("could not get proper response");
        })
    }, [])
    const afterDeletePlayer = (ID) => {
        const afterPlayerDelete = filterData.filter((val) => {
            return val._id != ID;
        });
        setFilterData(afterPlayerDelete)
    }
    const deletePlayer = async (playerID) => {
        await axios.delete(`${process.env.REACT_APP_DOMAIN}/delete-player`, {
            headers: {
                id: playerID
            }
        }).then((res) => {
            afterDeletePlayer(playerID);
        })
    }
    useEffect(() => {
        const result = data.filter((players) => {
            return players.firstName.toLowerCase().match(search.toLowerCase());
        })
        setFilterData(result)
    }, [search])
    const column = [
        {
            name: "PlayerID",
            selector: row => row.playerID,
        },
        {
            name: "Image",
            selector: row => <Avatar src={`${process.env.REACT_APP_DOMAIN}/playersImages/${row.image}`} />,
        },
        {
            name: "Full Name",
            selector: row => <>{row.firstName} {row.middleName} {row.lastName}</>,
        },
        {
            name: "Status",
            selector: row => row.playerStatus,
        },
        {
            name: "P/NO",
            selector: row => row.phone,
        },
        {
            name: "Email",
            selector: row => row.email,
        },
        {
            name: "View",
            selector: row => <Link to={`/dashboard/players/player-detailes/${row._id}`}>
                <VisibilityIcon style={{ color: "#1491A4" }} />
            </Link>,
        },
        {
            name: "Edit",
            selector: row => <EditIcon style={{ color: "green" }} />,
        },
        {
            name: "Delete",
            selector: row => <DeleteIcon onClick={() => { deletePlayer(row._id) }} style={{ color: "red", cursor: "pointer" }} />
        }
    ]
    return (
        <div>

            <Breadcrumb t={Props.t} headerLine="List Of Total Players Of ADCL Comming From Database" />

            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div style={{ width: "100%", margin: "10px 0", display: "flex", alignItems: "center" }}>
                            <Link to="/dashboard/add-new-player">
                                <Button variant="contained" color="primary" style={{ background: "#007BFF", color: "white" }}>Add New Player <AddIcon style={{ marginLeft: "10px", }} /></Button>
                            </Link>
                            <span style={{ margin: "0 10px", padding: "0 20px", background: "#BA6A27", borderRadius: "5px", color: "white", height: "100%", display: "flex", alignItems: "center" }}>Total Players {data.length}</span>
                        </div>
                        <div style={{ height: "500px", width: "100%", }}>
                            <DataTable
                                columns={column}
                                data={filterData}
                                pagination
                                fixedHeader
                                highlightOnHover
                                fixedHeaderScrollHeight='450px'
                                subHeader
                                progressPending={pending}
                                subHeaderComponent={
                                    <input type="text"
                                        style={{ padding: "5px 10px", border: "solid lightgray 1px", borderRadius: "5px", color: "lightgray" }}
                                        placeholder='Search Player Name'
                                        value={search}
                                        onChange={(e) => { setSearch(e.target.value) }}
                                        className='w-25'
                                    />
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Players