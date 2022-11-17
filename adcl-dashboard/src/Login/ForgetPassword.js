import React, { useState } from 'react';
import { Container, Box, Typography, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';

import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import { Link } from 'react-router-dom';
const ForgetPassword = (Props) => {
    const [errorShadow, setErrorShadow] = useState()
    const [recoveryEmail, setRecoveryEmail] = useState();
    const [status, setStatus] = useState();
    const [progress, setProgress] = useState(false)
    const [color, setColor] = useState({ color: "green", fontWeight: "bold", fontSize: "10px" });
    function progressChange(val) {
        setProgress(val);
    }
    const statusChange = (val) => {
        setStatus(val);
        setProgress(false)
        setErrorShadow("#008001 0px 7px 29px 0px");
    }
    const handleChange = (e) => {
        setRecoveryEmail(e.target.value);
        setErrorShadow("");
        setStatus("");
    }

    const forgetPass = async () => {
        await axios.post(`${process.env.REACT_APP_DOMAIN}/forgetpassword`, { recoveryEmail }).then((res) => {

            statusChange(res.data.message);
            setColor({ color: "green", fontSize: "13px" });
        }).catch((err) => {
            setStatus(err.response.data.error);
            setProgress(false);
            setColor({ color: "red", fontSize: "13px" });
            setErrorShadow("#ED6418 0px 7px 29px 0px");
        });
    }

    return (
        <div style={{}}>
            <Container maxWidth={"sm"}>
                <Box bgcolor={""} style={{ background: "#F0F0F0", padding: "20px", borderRadius: "5px", boxShadow: errorShadow }}>
                    <Typography variant={"h5"} align={"center"} style={{
                        color: "#ed6418",
                        marginBottom: "20px"
                    }} >
                        Recover Password
                    </Typography>
                    <input
                        type="email"
                        placeholder='Recovery Email'
                        onChange={handleChange}
                        style={{ width: "100%", fontSize: "15px", fontSize: "15px", padding: "5px", borderRadius: "3px", outline: "none", border: "solid #ed6418 1px", background: "transparent", margin: "10px 0" }}
                    />
                    <br />
                    {/* <Link to="#"> */}
                    <Typography align='center' style={color}>{
                        progress ? <><CircularProgress style={{ fontSize: "10px", width: "20px", height: "20px", color: "#ed6418" }} /></> : status
                    }</Typography>
                    <Button onClick={() => { forgetPass(); progressChange(true) }} disableElevation variant="contained" fullWidth style={{ marginTop: "10px", marginBottom: "20px", background: "#ed6418", color: "white" }}>Enter</Button>
                    {/* </Link> */}
                    <span onClick={() => { Props.cb(true) }} style={{ color: "#ed6418", cursor: "pointer" }}>GOTO LOGIN</span>
                </Box>
            </Container>
        </div >
    )
}
export default ForgetPassword;

