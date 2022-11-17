import React, { useState } from 'react'
import useStyles from './Style'
const AddTages = (props) => {


    const classes = useStyles();
    const [tags, setTags] = useState([]);

    const handleChange = (e) => {
        if (e.key !== ',') return
        // Get the value of the input
        const value = e.target.value
        // If the value is empty, return
        if (!value.trim()) return
        // Add the value to the tags array
        setTags([...tags, value])
        // Clear the input
        e.target.value = ''
    }

    const removeTag = (index) => {
        setTags(tags.filter((pn, val) => {
            return val !== index;
        }))
    }

    return (
        <div className={classes.addTageRoot}>
            <label>Sponsers</label>
            <div className={classes.addTageRootInput}>
                {
                    tags.map((val, index) => {
                        return (
                            <span key={index} class={classes.singleTag} ><span>{val}</span><span className={classes.singleTagClose} onClick={() => { removeTag(index) }}>x</span></span>
                        )
                    })
                }
                <input type="text" className={classes.theRealInput} onKeyDown={handleChange} placeholder='Add Sponsers .....' />
            </div>
            <div style={{ width: "100%", margin: "auto", display: "flex", justifyContent: "flex-end" }}> <p onClick={() => props.tags(tags)} style={{ background: "#007BFF", color: "white", padding: "10px 30px", marginTop: "5px", borderRadius: "5px", cursor: "pointer" }}>Save Sponsers</p></div>
        </div>
    )
}

export default AddTages






















