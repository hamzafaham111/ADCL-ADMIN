import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './Style'
import axios from 'axios';
const Categories = (Props) => {
    const classes = useStyles();
    const [categories, setCategories] = useState([])
    const [data, setData] = useState([]);
    const [seasonID, setSeasonID] = useState("");
    const [value, setValue] = useState({
        category: "",
        points: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }
    const add = (e) => {
        e.preventDefault()
        if (value.category && value.points) {
            setCategories([...categories, { categoryName: value.category, points: value.points }]);
            setValue({
                category: "",
                points: ""
            })
        }

    }
    const handleSeason = (e) => {
        setSeasonID(e.target.value);
    }
    const sendData = async () => {
        const data = {
            seasonID,
            categories
        }
        await axios.post(`${process.env.REACT_APP_DOMAIN}/add-category`, data).then((res) => {
            console.log("getiing good response");
            Props.cb(3)
        })
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/seasons`).then((res) => {
            setData(res.data.data);
        })
    })
    // const catogries = [
    //     { categoryName: "xyz", points: "100" },
    //     { categoryName: "xyz", points: "100" },
    //     { categoryName: "xyz", points: "100" },
    // ]
    return (
        <div>
            <form style={{}}>
                <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "23px", fontWeight: "bold" }}>Season Categories</span>
                </div>
                <div style={{ display: "flex", margin: "5px", justifyContent: "center", alignItems: "center" }}>
                    <select id="mySelect2" className="form-control select2 m-2" name='status' onChange={handleSeason}>
                        <option selected="selected">-- Select Season --</option>
                        {
                            data.map((val) => {
                                return (
                                    <option value={val._id}>{val.name}</option>
                                )
                            })
                        }
                    </select>
                    <input type="text"
                        value={value.category}
                        onChange={handleChange}
                        name="category"
                        className="form-control m-2"
                        id="startDate"
                        required
                        placeholder='Catogery Name' />
                    <input
                        type="text"
                        value={value.points}
                        onChange={handleChange}
                        name="points"
                        class="form-control m-2"
                        id="startDate"
                        placeholder='Category Points'
                        required
                    />
                    <button className='btn bg-primary' onClick={add}>Add</button>
                </div>
                <div style={{ display: "flex", }}>
                    {
                        categories.map((val) => {
                            return (<div style={{ width: "300px", color: "white", background: "green", display: "flex", justifyContent: "space-between", padding: "5px 15px", borderRadius: "5px", margin: "10px" }}>
                                <span >{val.categoryName}</span>
                                <span>{val.points}</span>
                            </div>
                            )
                        })
                    }
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <span className={classes.saveCatogriesBtn} onClick={sendData}>Next</span>
                </div>
            </form>
        </div>
    )
}

export default Categories