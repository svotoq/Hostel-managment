import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http';
import '../style/roomPage.css'
import { Link, useHistory, useParams } from 'react-router-dom'
import { check } from 'express-validator';
import { useMessage } from '../hooks/message';
import { StudentsTable } from '../components/Students/StudentsTable';
import { StudentsInfo } from '../components/Rooms/StudentsInfo';

export const RoomPage = () => {
    const roomdId = useParams().id
    const history = useHistory()
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp();

    const emptyChkbks = {
        storeroom: false
    }
    const emptyForm = {
        roomnumber: "", roomsize: "",
        emptyplaces: "", floornumber: "",
        inventory: "", students: []
    }
    const [form, setForm] = useState(emptyForm)
    const [checkbs, setCheckbs] = useState(emptyChkbks)
    const [currentRoom, setCurrentRoom] = useState(emptyForm)
    const checkbsChangeHandler = event => {
        setCheckbs({ ...checkbs, [event.target.name]: event.target.checked })
    }
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const saveHandler = async () => {
        try {
            const saveParams = { ...form, ...checkbs }
            const data = await request(`/api/rooms/${roomdId}`, 'PUT', { ...saveParams })
            message(data.message)
            fetchRoom()
            cancelHandler()
        } catch (e) {
            message(e.message)
        }
    }
    const cancelHandler = () => {
        setForm(currentRoom)
        disableForm(true)
        setCheckbs({ storeroom: currentRoom.storeroom })
        document.querySelector('#edit-button').removeAttribute('disabled')
        document.querySelector('#cancel-button').setAttribute('disabled', '')
    }

    const editHandler = () => {
        disableForm(false)
        document.querySelector('#edit-button').setAttribute('disabled', '')
        document.querySelector('#cancel-button').removeAttribute('disabled')
    }
  
    const fetchRoom = useCallback(async () => {
        try {
            const fetched = await request(`/api/rooms/${roomdId}`, 'GET')
            setCurrentRoom(fetched)
            setForm(fetched)
            setCheckbs({ storeroom: fetched.storeroom })

            if (fetched.storeroom) {
                document.querySelector("#livingroom").classList.add("hidden")
                document.querySelector("#storeroom").classList.remove("hidden")
            }
            else {
                document.querySelector("#storeroom").classList.add("hidden")
                document.querySelector("#livingroom").classList.remove("hidden")
            }
        } catch (e) { }
    }, [request])
    const disableForm = (value) => {
        const elements = document.querySelectorAll(".room-form")
        if (value) {
            elements.forEach(elem => {
                elem.setAttribute('disabled', '')
            })
        }
        else {
            elements.forEach(elem => {
                elem.removeAttribute('disabled')
            })
        }
    }
    useEffect(() => {
        fetchRoom()
        if(currentRoom.storeroom) {
            document.querySelector('#add-student').setAttribute('disabled','')
        }
        disableForm(true)
    }, [fetchRoom])

    return (
        <div className="room-container">
            <div className="header-container">
                <div className="label-value-container">
                    <div className="label-value">
                        <div className="label">Этаж:</div>
                        <div className="value">{currentRoom.roomnumber[0]}</div>
                    </div>
                    <div className="label-value">
                        <div className="label">Номер комнаты:</div>
                        <div className="value">{currentRoom.roomnumber}</div>
                    </div>

                </div>
                <div className="label-value-container">
                    <div className="label-value">
                        <div className="label">Количество мест:</div>
                        <div className="value">{currentRoom.roomsize}</div>
                    </div>
                    <div className="label-value">
                        <div className="label">Проживающих:</div>
                        <div className="value">{currentRoom.students.length}</div>
                    </div>
                    <div className="label-value">
                        <div className="label">Количество пустых мест:</div>
                        <div className="value">{currentRoom.roomsize - currentRoom.students.length}</div>
                    </div>
                </div>
                <div className="label-value-container">
                    <div className="label-value">
                        <div className="label">Тип помещения:</div>
                        <div className="value" id="storeroom">Складское</div>
                        <div className="value" id="livingroom">Жилое</div>
                    </div>
                </div>
            </div>
            <div class="indicator indicator-default"></div>
            <div class="room-content room-overflow">
                <div className="row">
                    <div className="search-input-field col s4">
                        <label htmlFor="roomnumber">Номер комнаты</label>
                        <input id="roomnumber"
                            type="text"
                            name="roomnumber"
                            onChange={changeHandler}
                            value={form.roomnumber}
                            className="room-form" />
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="roomsize">Размер комнаты</label>
                        <input id="roomsize"
                            type="number"
                            name="roomsize"
                            value={form.roomsize}
                            onChange={changeHandler}
                            className="room-form" />
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="emptyplaces">Количество пустых мест</label>
                        <input id="emptyplaces"
                            type="number"
                            name="emptyplaces"
                            value={form.roomsize - form.students.length}
                            onChange={changeHandler} disabled />
                    </div>
                </div>
                <div className="row">
                    <div className="search-input-field col s4">
                        <label htmlFor="floornumber">Этаж</label>
                        <input id="floornumber"
                            type="number"
                            name="floornumber"
                            disabled
                            value={form.roomnumber[0]}
                            onChange={changeHandler} />
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="inventory">Инвентарь</label>
                        <input id="inventory"
                            type="text"
                            name="inventory"
                            value={form.inventory}
                            onChange={changeHandler}
                            className="room-form" />
                    </div>
                    <div className="checkbox-containter col s4">
                        <label>
                            <input type="checkbox"
                                name="storeroom"
                                id="storeroom"
                                className="room-form"
                                checked={checkbs.storeroom}
                                onChange={checkbsChangeHandler}
                            />
                            <span>Склад</span>
                        </label>
                    </div>
                </div>
                <div className="row">
                    <StudentsInfo students={currentRoom.students} roomId={roomdId} />
                </div>
            </div>
            <div className="footer-save">
                <div className="footer-add-button">
                    <a className="waves-effect waves-light btn footer-button" id="add-student">
                        <Link to={`/createStudent/${currentRoom.id}`} className="next-red-button">
                            Добавить студента
                            </Link>
                    </a>
                </div>
                <div className="footer-buttons">
                    <a className="waves-effect waves-light btn footer-button"
                        id="edit-button"
                        onClick={editHandler}
                    >Изменить</a>
                    <a className="waves-effect waves-light btn-flat footer-button cancel-button" disabled
                        id="cancel-button"
                        onClick={cancelHandler}
                    >Отмена</a>
                    <a className="waves-effect waves-light btn footer-button red accent-4"
                        onClick={saveHandler}
                    >Сохранить</a>
                </div>
            </div>
        </div>
    )
};