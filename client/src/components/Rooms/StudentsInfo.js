import React from 'react'
import { Link } from 'react-router-dom'
import '../../style/table.css'
import 'materialize-css'
import dateFormat from 'dateformat';

export const StudentsInfo = ({ students, roomId }) => {
    if (!students.length && roomId) {
        return (
            <p className="center">Студентов нет</p>
        )
    }
    return (
        <div className="table-container">
            <table className="striped table teal lighten-2">
                <thead>
                    <tr>
                        <th>ФИО</th>
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