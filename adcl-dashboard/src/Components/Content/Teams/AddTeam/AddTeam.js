import React from 'react'
import Breadcrumb from '../../Breadcrumb'

const AddTeam = (Props) => {
    return (
        <>
            <Breadcrumb t={Props.t} />
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <h1>Add New Team</h1>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddTeam