import React, { useContext, useEffect, useState } from 'react'
import '../style/auth.css'
import { useHttp } from '../hooks/http';
import { useMessage } from '../hooks/message';
import { AuthContext } from '../context/AuthContext';


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({
        email: "", password: ""
    });

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    useEffect(()=>{
        window.M.updateTextFields()
    }, [])
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) { }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) { }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s4 maxHeight">
                <div className="block">
                    <h5 className="header-middle">Login</h5>
                    <div className="row">
                        <div className="input-field col s12">
                            <input placeholder="Введите почту"
                                id="email"
                                type="text"
                                name="email"
                                className="validate white-input"
                                onChange={changeHandler} />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input placeholder="Введите пароль"
                                id="password"
                                type="password"
                                name="password"
                                className="validate white-input"
                                onChange={changeHandler} />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row btn-middle">
                        <button className="btn waves-effect waves-light "
                            type="submit"
                            name="action"
                            onClick={loginHandler}
                            disabled={loading}>Войти
                        <i className="material-icons right">send</i>
                        </button>
                    </div>
                    <div className="row btn-middle">
                        <span className="reg-link"
                            onClick={registerHandler}
                            disabled={loading}>Регистрация</span>
                    </div>
                </div>
            </div>
        </div>
    )
};