import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../../style/table.css'
import 'materialize-css'
import dateFormat from 'dateformat';
import { useHttp } from '../../hooks/http';

export const StudentsTable = ({ students }) => {
    const { loading, error, request, clearError } = useHttp();

    const getFilehHandler = async () => {
        try {
            const fetched = await request('/api/excel/students', 'GET')
            window.location.href = "http://localhost:4000/api/excel/students"
        } catch (e) {
            window.location.href = "http://localhost:4000/api/excel/students"
            console.log(e.message)
        }
    }

    if (!students.length) {
        return (
            <div className="table-container">
                <div className="create-room">
                    <Link to={`/chooseRoom`} >
                        Добавить студента
                </Link>
                </div>
                <p className="center">Студентов нет</p>
            </div>
        )
    }
    return (
        <div className="table-container">
            <div className="create-room">
            <button onClick={getFilehHandler} className="btn-flat button-download">Excel</button>
                <Link to={`/chooseRoom`} >
                    Добавить студента
                </Link>
            </div>
            <table className="striped table teal lighten-2">
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Комната</th>
                        <th>Дата рождения</th>
                        <th>Пол</th>
                        <th>Почта</th>
                        <th>Телефон</th>
                        <th>Заселение</th>
                        <th>Выселение</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        students.map(student => {
                            return (
                                <tr>
                                    <td>{`${student.firstname} ${student.firstname[0]}. ${student.patronymic[0]}.`}</td>
                                    <td>{student.room.roomnumber}</td>
                                    <td>{dateFormat(student.birthdate, 'dd.mm.yyyy')}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{dateFormat(student.arrivaldate, 'dd.mm.yyyy')}</td>
                                    <td>{dateFormat(student.leavedate, 'dd.mm.yyyy')}</td>
                                    <td>
                                        <Link to={`/student/${student.id}`} >
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