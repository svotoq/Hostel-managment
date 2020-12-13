import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../../style/table.css'
import 'materialize-css'
import { useHttp } from '../../hooks/http'


export const RoomsTable = ({ rooms }) => {
    const { loading, error, request, clearError } = useHttp();
    const history = useHistory()
    const getFilehHandler = async () => {
        try {
            const fetched = await request('/api/excel/rooms', 'GET')
            window.location.href = "http://localhost:4000/api/excel/rooms"
        } catch (e) {
            console.log(e.message)
            window.location.href = "http://localhost:4000/api/excel/rooms"
        }
    }

    if (!rooms.length) {
        return (
            <div className="table-container">
                <div className="create-room">
                    <Link to={`/createRoom`} >
                        Создать комнату
                </Link>
                </div>
                <p className="center">Комнат нет</p>
            </div>
        )
    }
    return (
        <div className="table-container">
            <div className="create-room">
                <button onClick={getFilehHandler} className="btn-flat button-download">Excel</button>
                <Link to={`/createRoom`} >
                    Создать комнату
                </Link>
            </div>
            <table className="striped table teal lighten-2">
                <thead>
                    <tr>
                        <th>Этаж</th>
                        <th>Номер</th>
                        <th>Размер</th>
                        <th>Проживает</th>
                        <th>Свободные места</th>
                        <th>Склад</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        rooms.map(room => {
                            return (
                                <tr>
                                    <td>{room.roomnumber[0]}</td>
                                    <td>{room.roomnumber}</td>
                                    <td>{room.roomsize}</td>
                                    <td>{room.students.length}</td>
                                    <td>{room.roomsize - room.students.length}</td>
                                    <td>
                                        <label>
                                            <input type="checkbox" defaultChecked={room.storeroom} disabled />
                                            <span></span>
                                        </label>
                                    </td>
                                    <td>
                                        <Link to={`/room/${room.id}`} >
                                            <i className="small material-icons light-blue darken-4">chevron_right</i>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}