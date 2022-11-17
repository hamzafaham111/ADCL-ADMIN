import React from 'react'
import Home from './Home.js/Home'
import Players from './Players/Players'
import { Outlet, Route, Routes } from "react-router-dom";
const Content = () => {
    return (
        <div>
            <div className="content-wrapper">
                <Routes>
                    <Route path='/dashboard' element={<Home p="Home" />} />
                    <Route path='/player' element={<Players p="Players" />} />
                </Routes>
            </div>

        </div>
    )
}

export default Content