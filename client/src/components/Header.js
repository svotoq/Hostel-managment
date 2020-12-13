import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
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
    const navBack = event => {
        event.preventDefault()
        history.goBack()
    }
    return (
        <div className="container">
            <nav>
                <div className="nav-wrapper header">
                    <button onClick={navBack} className="btn-flat nav-back">
                        <i class="material-icons">arrow_back</i>
                    </button>
                    <span className="brand-logo">Hostel Managment</span>
                    <ul id="nav-mobile" className="right nide-on-med-and-down">
                        <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                    </ul>
                </div>
            </nav>
        </div>
        // header with info about conrete page
    )
}