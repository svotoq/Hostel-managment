import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http';
import '../style/roomPage.css'
import { Link, useHistory, useParams } from 'react-router-dom'
import { check } from 'express-validator';
import { useMessage } from '../hooks/message';
import dateFormat from 'dateformat';

export const StudentPage = () => {
    const studentId = useParams().id
    const history = useHistory()
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp();

    const emptyForm = {
        firstname: "", lastname: "", patronymic: "",
        birthdate: "", gender: "", email: "",
        phone: "", arrivaldate: "", leavedate: "", room: {}
    }

    const [form, setForm] = useState(emptyForm)
    const [rooms, setRooms] = useState([])
    const [currentStudent, setCurrentStudent] = useState(emptyForm)

    const changeHandler = event => {
        try {
            if (event.target.name === "arrivaldate" ||
                event.target.name === "birthdate" ||
                event.target.name === "leavedate") {
                console.log(event.target.value)
                event.target.value = dateFormat(event.target.value, 'yyyy-mm-dd')
            }
            setForm({ ...form, [event.target.name]: event.target.value })
        }
        catch (e) {

        }
    }
    const saveHandler = async () => {
        try {
            const saveParams = { ...form }
            saveParams.leavedate = dateFormat(saveParams.leavedate, 'dd.mm.yyyy')
            saveParams.birthdate = dateFormat(saveParams.birthdate, 'dd.mm.yyyy')
            saveParams.arrivaldate = dateFormat(saveParams.arrivaldate, 'dd.mm.yyyy')
            console.log(saveParams)
            const data = await request(`/api/students/${studentId}`, 'PUT', { ...saveParams })
            message(data.message)
            fetchStudent()
            cancelHandler()
        } catch (e) {
            message(e.message)
        }
    }
    const cancelHandler = () => {
        setForm(currentStudent)
        disableForm(true)
        document.querySelector('#edit-button').removeAttribute('disabled')
        document.querySelector('#cancel-button').setAttribute('disabled', '')
    }

    const editHandler = () => {
        disableForm(false)
        document.querySelector('#edit-button').setAttribute('disabled', '')
        document.querySelector('#cancel-button').removeAttribute('disabled')
    }
    const deleteHandler = useCallback(async () => {
        try {
            debugger
            const fetched = await request(`/api/students/${studentId}`, 'DELETE')
            history.goBack()
        } catch (e) {
        }
    }, [request])
    const fetchStudent = useCallback(async () => {
        try {
            const fetched = await request(`/api/students/${studentId}`, 'GET')
            setForm(fetched)
            setCurrentStudent(fetched)
        } catch (e) { }
    }, [request])

    const fetchRooms = useCallback(async () => {
        try {
            const data = await request('/api/rooms/', 'GET')
            setRooms(data)
        } catch (e) {
            console.log(e.message)
        }
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
        fetchStudent()
        fetchRooms()
        var elems = document.querySelectorAll('.datepicker');
        var instances = window.M.Datepicker.init(elems);
        var elems2 = document.querySelectorAll('select');
        var instances2 = window.M.FormSelect.init(elems2);
        disableForm(true)
    }, [fetchStudent, fetchRooms])

    return (
        <div className="room-container">
            <div className="header-container">
                <div className="label-value-container">
                    <div className="label-value">
                        <div className="label">ФИО:</div>
                        <div className="value">{`${currentStudent.firstname} ${currentStudent.firstname[0]}. ${currentStudent.patronymic[0]}.`}</div>
                    </div>
                    <div className="label-value">
                        <div className="label">Дата рождения:</div>
                        <div className="value">{dateFormat(currentStudent.birthdate, 'dd.mm.yyyy')}</div>
                    </div>

                </div>
                <div className="label-value-container">
                    <div className="label-value">
                        <div className="label">Пол:</div>
                        <div className="value">{currentStudent.gender}</div>
                    </div>
                    <div className="label-value">
                        <div className="label">Почта:</div>
                        <div className="value">{currentStudent.email}</div>
                    </div>
                    <div className="label-value">
                        <div className="label">Телефон:</div>
                        <div className="value">{currentStudent.phone}</div>
                    </div>
                </div>
                <div className="label-value-container">
                    <div className="label-value">
                        <div className="label">Заселение:</div>
                        <div className="value">{dateFormat(currentStudent.arrivaldate, 'dd.mm.yyyy')}</div>
                    </div>
                    <div className="label-value">
                        <div className="label">Выселение:</div>
                        <div className="value">{dateFormat(currentStudent.leavedate, 'dd.mm.yyyy')}</div>
                    </div>
                </div>
            </div>
            <div class="indicator indicator-default"></div>
            <div class="room-content room-overflow">
                <div className="row">
                    <div className="search-input-field col s4">
                        <label htmlFor="firstname">Имя</label>
                        <input id="firstname"
                            type="text"
                            name="firstname"
                            onChange={changeHandler}
                            value={form.firstname} disabled
                            className="room-form" />
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="lastname">Фамилия</label>
                        <input id="lastname"
                            type="text"
                            name="lastname"
                            value={form.lastname}
                            onChange={changeHandler} disabled
                            className="room-form" />
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="patronymic">Отчество</label>
                        <input id="patronymic"
                            type="text"
                            name="patronymic"
                            value={form.patronymic}
                            onChange={changeHandler} disabled
                            className="room-form" />
                    </div>
                </div>
                <div className="row">
                    <div className="search-input-field col s4">
                        <label htmlFor="birthdate">Дата рождения</label>
                        <input id="birthdate"
                            type="text"
                            name="birthdate"
                            value={dateFormat(form.birthdate, 'dd.mm.yyyy')}
                            className="datepicker room-form"
                            onSelect={changeHandler} disabled />
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="gender">Пол</label>
                        <div>
                            <select class="browser-default room-form"
                                id="gender"
                                name="gender"
                                onChange={changeHandler} disabled>
                                <option value="" selected id="default-select">Любой</option>
                                <option value="Мужской">Мужской</option>
                                <option value="Женский">Женский</option>
                            </select>
                        </div>

                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="roomnumber">Номер комнаты</label>
                        <select className="browser-default room-form"
                            id="roomnumber"
                            name="roomnumber"
                            onChange={changeHandler}
                            disabled>
                            <option value={form.room.roomnumber} selected disabled>{form.room.roomnumber}</option>
                            {rooms.map((room, index) => {
                                if (room.roomsize - room.students.length > 0 && room.id !== form.room.id) {
                                    return (<option value={room.id}>Номер комнаты: {room.roomnumber}, Свободных мест: {room.roomsize - room.students.length}</option>)
                                }
                            })}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="search-input-field col s4">
                        <label htmlFor="email">Email</label>
                        <input id="email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={changeHandler} disabled
                            className="room-form" />
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="phone">Телефон</label>
                        <input id="phone"
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={changeHandler} disabled
                            className="room-form" />
                    </div>
                </div>
                <div className="row">
                    <div className="search-input-field col s4">
                        <label htmlFor="arrivaldate">Дата заселения</label>
                        <input id="arrivaldate"
                            type="text"
                            name="arrivaldate"
                            value={dateFormat(form.arrivaldate, 'dd.mm.yyyy')}
                            onSelect={changeHandler}
                            className="datepicker room-form" disabled />
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="leavedate">Дата выселения</label>
                        <input id="leavedate"
                            type="text"
                            name="leavedate"
                            value={dateFormat(form.leavedate, 'dd.mm.yyyy')}
                            onSelect={changeHandler}
                            className="datepicker room-form" disabled />
                    </div>
                </div>
            </div>
            <div className="footer-save">
                <div className="footer-add-button">
                    <a className="waves-effect waves-light btn footer-button"
                        id="delete-button"
                        onClick={deleteHandler}
                    >Удалить</a>
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