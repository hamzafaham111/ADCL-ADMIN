import React, { useState } from 'react'
import ForgetPassword from './ForgetPassword'
import Login from './Login'
import LOGO from './Assets/ADCL-LOGO (2).png'
const Index = (Props) => {
    const [state, setState] = useState(true)
    // const callBack = (val) => {
    //     setState(val);
    //     console.log("calback is working");
    // }
    return (
        <div >
            <div style={{
                display: "flex", justifyContent: "center",
            }}>
                <img src={LOGO} style={{ filter: "drop-shadow(5px 5px 5px #666666)", marginTop: "10px", marginBottom: "20px", objectFit: "cover", }} alt="ADCL Logo" />
            </div>
            {
                state ? <><Login cb={setState} p={Props.cb} /></> : <><ForgetPassword cb={setState} /></>
            }
        </div>
    )
}

export default Index