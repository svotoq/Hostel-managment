import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import '../style/header.css'
export const Header = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout();
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue darken-1 header-padding">
                <span className="brand-logo">Hostel Managment</span>
                <ul id="nav-mobile" className="right nide-on-med-and-down">
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                    {/* <li><NavLink to="/rooms" >2</NavLink></li> */}
                </ul>
            </div>
        </nav>
        // header with info about conrete page
    )
}