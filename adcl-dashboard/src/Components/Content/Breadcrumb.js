import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = (Props) => {
    return (
        <div>

            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">{Props.t}</h1>
                            <p style={{ color: "gray" }}>{Props.headerLine}</p>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                                {
                                    Props.link ? <>
                                        <li className="breadcrumb-item active"><Link to={Props.link}>{Props.in}</Link></li>
                                    </> : <></>
                                }
                                <li className="breadcrumb-item active">{Props.t}</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>



        </div>
    )
}

export default Breadcrumb