import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http';
import { useMessage } from '../hooks/message';
import '../style/createRooms.css'
import 'materialize-css'
import { useHistory } from 'react-router-dom';

export const CreateRoomPage = () => {
    const history = useHistory()
    const { loading, error, request, clearError } = useHttp();
    const message = useMessage()

    const emptyForm = {
        roomNumber: "", roomSize: ""
    }
    const emptyChkbks = {
        storeRoom: false
    }
    const [form, setForm] = useState(emptyForm)
    const [checkbs, setCheckbs] = useState(emptyChkbks)

    const checkbsChangeHandler = event => {
        setCheckbs({ ...checkbs, [event.target.name]: event.target.checked })
    }
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const saveHandler = async () => {
        try {
            const saveParams = { ...form, ...checkbs }
            const data = await request('/api/rooms/', 'POST', { ...saveParams })
            message(data.message)
            history.goBack()
        } catch (e) {
        }
    }
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        var el = document.querySelector(".tabs")
        var instance = window.M.Tabs.init(el, {});
    }, [])
    return (
        <div>
            <div className="row">
                <div className="col s12 tab-col">
                    <ul className="tabs tabs-style">
                        <li className="tab col s3 "><a className="active" href="#test1">Информация о комнате</a></li>
                        <li className="tab col s3 "><a href="#test2">Инвентарь</a></li>
                        <li className="indicator indicator-default"></li>
                    </ul>
                </div>
                <div id="test1" className="col s12 tab-col">
                    <div className="tab-container">
                        <div className="row">
                            <div className="search-input-field col s4">
                                <label htmlFor="roomNumber">Номер комнаты</label>
                                <input id="roomNumber"
                                    type="roomNumber"
                                    name="roomNumber"
                                    onChange={changeHandler}
                                    value={form.roomNumber}
                                    className="validate" />
                            </div>
                            <div className="search-input-field col s4">
                                <label htmlFor="roomSize">Размер комнаты</label>
                                <input id="roomSize"
                                    type="roomSize"
                                    name="roomSize"
                                    value={form.roomSize}
                                    onChange={changeHandler}
                                    className="validate" />
                            </div>
                            <div className="checkbox-containter col s4">
                                <label>
                                    <input type="checkbox"
                                        name="storeRoom"
                                        id="storeRoom"
                                        onChange={checkbsChangeHandler}
                                    />
                                    <span>Склад</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="test2" className="col s12 tab-col">
                    <div className="tab-container">
                        <div>Inentory</div>
                    </div>
                </div>
            </div>
            <div className="footer-save">
                <div className="footer-create-button">
                    <a className="waves-effect waves-light btn save-red-button"
                        onClick={saveHandler}>Сохранить</a>
                </div>
            </div>
        </div>
    )
};