import React, { useState } from 'react'
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import Content from './Components/Content/Content';
import Footer from './Components/Footer/Footer';
import Login from './Login/index';
import { Outlet } from 'react-router-dom';
const Master = () => {
    const [state, setState] = useState(true)
    const changeState = (val) => {
        setState(val)
    }
    return (
        <div>
            <Header />
            <SideBar />
            <div className="content-wrapper">
                <Outlet />
            </div>
            <Footer />
        </div >
    )
}

export default Master