import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http';
import { useMessage } from '../../hooks/message';
import { StudentsTable } from './StudentsTable'
import '../../style/search.css'
import 'materialize-css'
import ReactTestUtils from 'react-dom/test-utils'
export const SearchStudents = () => {
    const { loading, error, request, clearError } = useHttp();
    const emptyForm = {
        firstname: "", lastname: "", patronymic: "",
        birthdate: "", gender: "", email: "",
        phone: "", arrivaldate: "", leavedate: "",
        roomnumber: ""
    }

    const [form, setForm] = useState(emptyForm)
    const [students, setStudents] = useState([])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const searchHandler = async () => {
        try {
            const searchParams = { ...form }
            Object.keys(searchParams).forEach((key) => (searchParams[key] == "") && delete searchParams[key])
            const data = await request('/api/students/search', 'POST', { ...searchParams })
            setStudents(data)
        } catch (e) {
        }
    }
    const resetHandler = () => {
        setForm(emptyForm)
        document.querySelector("#default-select").selected = true
        fetchStudents()
    }
    const fetchStudents = useCallback(async () => {
        try {
            const fetched = await request('/api/students', 'GET')
            setStudents(fetched)
        } catch (e) { }
    }, [request])

    useEffect(() => {
        fetchStudents()
        var elems = document.querySelectorAll('.datepicker');
        var instances = window.M.Datepicker.init(elems, { format: 'dd.mm.yyyy' });
        var elems2 = document.querySelectorAll('select');
        var instances2 = window.M.FormSelect.init(elems2, {});
    }, [fetchStudents])
    return (
        <div>
            <div className="search-container">
                <div className="row">
                    <div className="search-input-field col s4">
                        <label htmlFor="firstname">Имя</label>
                        <input id="firstname"
                            type="text"
                            name="firstname"
                            onChange={changeHandler}
                            value={form.firstname}/>
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="lastname">Фамилия</label>
                        <input id="lastname"
                            type="text"
                            name="lastname"
                            value={form.lastname}
                            onChange={changeHandler}/>
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="patronymic">Отчество</label>
                        <input id="patronymic"
                            type="text"
                            name="patronymic"
                            value={form.patronymic}
                            onChange={changeHandler}/>
                    </div>
                </div>
                <div className="row">
                    <div className="search-input-field col s4">
                        <label htmlFor="birthdate">Дата рождения</label>
                        <input id="birthdate"
                            type="text"
                            name="birthdate"
                            value={form.birthdate}
                            onSelect={changeHandler}/>
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="gender">Пол</label>
                        <div>
                            <select class="browser-default"
                                id="gender"
                                name="gender"
                                onChange={changeHandler}>
                                <option value="" selected id="default-select">Любой</option>
                                <option value="Мужской">Мужской</option>
                                <option value="Женский">Женский</option>
                            </select>
                        </div>

                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="roomnumber">Номер комнаты</label>
                        <input id="roomnumber"
                            type="text"
                            name="roomnumber"
                            value={form.roomnumber}
                            onChange={changeHandler}/>
                    </div>
                </div>
                <div className="row">
                    <div className="search-input-field col s4">
                        <label htmlFor="email">Email</label>
                        <input id="email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={changeHandler}/>
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="phone">Телефон</label>
                        <input id="phone"
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={changeHandler}/>
                    </div>
                </div>
                <div className="row">
                    <div className="search-input-field col s4">
                        <label htmlFor="arrivaldate">Дата заселения</label>
                        <input id="arrivaldate"
                            type="text"
                            name="arrivaldate"
                            value={form.arrivaldate}
                            onSelect={changeHandler}
                            className="datepicker" />
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="leavedate">Дата выселения</label>
                        <input id="leavedate"
                            type="text"
                            name="leavedate"
                            value={form.leavedate}
                            onSelect={changeHandler}
                            className="datepicker" />
                    </div>
                    <div className="bottom-row">
                        <a className="waves-effect waves-light btn-flat reset-button"
                            onClick={resetHandler}>Сбросить</a>
                        <a className="waves-effect waves-light btn red accent-4 search-button"
                            onClick={searchHandler}>GO</a>
                    </div>
                </div>
            </div>
            { <StudentsTable students={students} />}
        </div >
    )
}