import React from 'react'

export default function Loader({LoadAnim, visibile = false}) {
    if (!visibile) return null;

    return (
        <img src={Loader} alt="Loading..." className="loader"/>
    )
}
