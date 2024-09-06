import React, { useState } from 'react'
import mainContext from './mainContext'


export default function MainState(props) {
    const [navbarRender, setNavbarRender] = useState(false);
    const [code, setCode] = useState('')
    return (
        <mainContext.Provider value={{
            navbarRender, setNavbarRender,
            code, setCode,
        }}>
            {props.children}
        </mainContext.Provider>
    )
}
