import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http';
import { useMessage } from '../hooks/message';

export const ChooseRoom = () => {
    const message = useMessage()
    const history = useHistory()
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({})
    const [rooms, setRooms] = useState([])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
        document.querySelector("#next-button").removeAttribute('disabled', '')
    }

    const fetchRooms = useCallback(async () => {
        try {
            const data = await request('/api/rooms/', 'GET')
            setRooms(data)
        } catch (e) {
            console.log(e.message)
        }
    }, [request])


    useEffect(() => {
        fetchRooms()
    }, [fetchRooms])


    return (
        <div >
            <div className="table-container choose-room">
                <select className="browser-default"
                    id="room"
                    name="room"
                    onChange={changeHandler}>
                    <option value="" selected disabled>Любой</option>
                    {rooms.map((room, index) => {
                        if (room.roomsize - room.students.length > 0) {
                            return (<option value={room.id}>Номер комнаты: {room.roomnumber}, Свободных мест: {room.roomsize - room.students.length}</option>)
                        }
                    })}
                </select>
            </div>
            <div className="footer-save footer-choose">
                <div className="footer-create-button">
                    <a className="waves-effect waves-light btn save-red-button" id="next-button" disabled>
                        <Link to={`/createStudent/${form.room}`} className="next-red-button">
                            Дальше
                    </Link>
                    </a>
                </div>
            </div>
        </div>
    )
};