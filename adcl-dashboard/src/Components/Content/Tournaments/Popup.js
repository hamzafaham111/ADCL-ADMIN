import React from 'react'

const Popup = (Props) => {
    return (Props.trigger) ? (
        <div style={{}}>    
            {Props.children}
        </div>
    ) : "";
}

export default Popup