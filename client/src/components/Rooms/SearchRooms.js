import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http';
import { useMessage } from '../../hooks/message';
import { RoomsTable } from './RoomsTable'
import '../../style/search.css'
import 'materialize-css'

export const SearchRooms = () => {
    const { loading, error, request, clearError } = useHttp();
    const emptyForm = {
        roomnumber: "", roomsize: "",
        emptyplaces: "", floornumber: "",
        inventory: ""
    }
    const emptyChkbks = {
        emptyroom: false, storeroom: false
    }
    const [form, setForm] = useState(emptyForm)
    const [checkbs, setCheckbs] = useState(emptyChkbks)
    const [rooms, setRooms] = useState([])

    const checkbsChangeHandler = event => {
        setCheckbs({ ...checkbs, [event.target.name]: event.target.checked })
    }
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const searchHandler = async () => {
        try {
            const searchParams = { ...form, ...checkbs }
            Object.keys(searchParams).forEach((key) => (searchParams[key] == "") && delete searchParams[key])
            const data = await request('/api/rooms/search', 'POST', { ...searchParams })
            setRooms({})
            setRooms(data)
        } catch (e) {
            console.log(e.message)
        }
    }
    const resetHandler = () => {
        setForm(emptyForm)
        setCheckbs(emptyChkbks)
        document.querySelector("#storeroom").checked = false;
        document.querySelector("#emptyroom").checked = false;
        fetchRooms()
    }
    const fetchRooms = useCallback(async () => {
        try {
            const fetched = await request('/api/rooms', 'GET')
            setRooms({})
            setRooms(fetched)
        } catch (e) { }
    }, [request])

    useEffect(() => {
        fetchRooms()
    }, [fetchRooms])


    return (
        <div>
            <div className="search-container search-rooms">
                <div className="row">
                    <div className="search-input-field col s4">
                        <label htmlFor="roomnumber">Номер комнаты</label>
                        <input id="roomnumber"
                            type="text"
                            name="roomnumber"
                            onChange={changeHandler}
                            value={form.roomnumber}/>
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="roomsize">Размер комнаты</label>
                        <input id="roomsize"
                            type="number"
                            name="roomsize"
                            value={form.roomsize}
                            onChange={changeHandler}/>
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="emptyplaces">Количество пустых мест</label>
                        <input id="emptyplaces"
                            type="number"
                            name="emptyplaces"
                            value={form.emptyplaces}
                            onChange={changeHandler}/>
                    </div>
                </div>
                <div className="row">
                    <div className="search-input-field col s4">
                        <label htmlFor="floornumber">Этаж</label>
                        <input id="floornumber"
                            type="number"
                            name="floornumber"
                            value={form.floornumber}
                            onChange={changeHandler}
                            className="validate" />
                    </div>
                    <div className="search-input-field col s4">
                        <label htmlFor="inventory">Инвентарь</label>
                        <input id="inventory"
                            type="text"
                            name="inventory"
                            value={form.inventory}
                            onChange={changeHandler}
                            className="validate" />
                    </div>
                    <div className="checkbox-containter col s4">
                        <div className="col s6">
                            <label>
                                <input type="checkbox"
                                    name="emptyroom"
                                    id="emptyroom"
                                    onChange={checkbsChangeHandler}
                                />
                                <span>Свободная</span>
                            </label>
                        </div>
                        <div className="col s6">
                            <label>
                                <input type="checkbox"
                                    name="storeroom"
                                    id="storeroom"
                                    onChange={checkbsChangeHandler}
                                />
                                <span>Склад</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row bottom-row">
                    <a className="waves-effect waves-light btn-flat reset-button"
                        onClick={resetHandler}>Сбросить</a>
                    <a className="waves-effect waves-light btn red accent-4 search-button"
                        onClick={searchHandler}>GO</a>
                </div>
            </div>
            {<RoomsTable rooms={rooms} />}
        </div>
    )
}