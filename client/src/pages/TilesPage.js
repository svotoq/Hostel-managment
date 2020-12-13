import React from 'react'
import { NavLink } from 'react-router-dom';
import '../style/tiles.css'

export const TilesPage = () => {
    return (
        <div className="tiles-container">
             <NavLink to="/rooms">
            <div className="tile">
                <div className="tile-title">Комнаты</div>
                <div className="tile-icon">
                    <i className="medium material-icons">airline_seat_individual_suite</i>
                </div>
            </div>
            </NavLink>
            <NavLink to="/students">
                <div className="tile">
                    <div className="tile-title">Студенты</div>
                    <div className="tile-icon">
                        <i className="medium material-icons">account_box</i>
                    </div>
                </div>
            </NavLink>
        </div>
    )
};