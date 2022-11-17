import React, { useState, useContext } from 'react';
import { Container, Box, Typography, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { createBrowserHistory } from 'history'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Login = (Props) => {
    const [progress, setProgress] = useState(false)
    const [status, setStatus] = useState('');
    const [errorShadow, setErrorShadow] = useState()
    const [cookies, setCookie] = useCookies()
    const progressFunction = (val) => {
        setProgress(val);
    }
    const history = createBrowserHistory()
    const [data, setData] = useState({
        enterEmail: "",
        enterPassword: ""
    })
    const dashbord = (val) => {
        setCookie("JWT", val);
        history.push('/dashboard');
        window.location.reload(true);

    }
    const login = async () => {
        await axios.post(`${process.env.REACT_APP_DOMAIN}/login`, data).then((res) => {
            dashbord(res.data.token)
        }).catch((err) => { setStatus(err.response.data.error); progressFunction(false); setErrorShadow("#ED6418 0px 7px 29px 0px") })
    }
    const handleChange = (e) => {
        setStatus("");
        setErrorShadow("");
        const { value, name } = e.target;
        setData((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }
    return (
        <div style={{}}>
            <Container maxWidth={"sm"} >
                <Box bgcolor={""} style={{ background: "#F0F0F0", padding: "20px", borderRadius: "5px", boxShadow: errorShadow }}>
                    <Typography variant={"h5"} align={"center"} style={{
                        color: "#ed6418",
                        marginBottom: "20px"
                    }} >
                        LOGIN
                    </Typography>
                    <input
                        type="email"
                        onChange={handleChange}
                        placeholder="Email"
                        style={{ width: "100%", padding: "5px", fontSize: "15px", borderRadius: "3px", outline: "none", border: "solid #ed6418 1px", background: "transparent", margin: "10px 0" }}
                        name="enterEmail"
                    />

                    <input
                        onChange={handleChange}
                        name="enterPassword"
                        type="password"
                        placeholder="Password"
                        style={{ width: "100%", padding: "5px", fontSize: "15px", borderRadius: "3px", outline: "none", border: "solid #ed6418 1px", background: "transparent", margin: "10px 0" }}
                    />
                    <br />
                    <Typography align='center' size={'medium'} style={{ color: "red", fontWeight: "bold", fontSize: "13px" }}>{
                        progress ? <><CircularProgress style={{ fontSize: "10px", width: "20px", height: "20px", color: "#ed6418" }} /></> : status
                    }</Typography>
                    <Button disableElevation variant="contained" onClick={() => { login(); progressFunction(true) }} fullWidth style={{ marginTop: "30px", marginBottom: "20px", background: "#ed6418", color: "white" }}>Login</Button>
                    <span onClick={() => { Props.cb(false) }} style={{ color: "#ed6418", cursor: "pointer" }}>Forget Password? </span>
                </Box>
            </Container>
        </div >
    )
}
export default Login;

