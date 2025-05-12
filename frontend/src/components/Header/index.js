import React from 'react'
import NavBar from '../NavBar'
import style from './Header.module.css'
const Header = () => {
    return (
        <div className={style["header-container"]}>
            <NavBar />
        </div>
    )
}

export default Header