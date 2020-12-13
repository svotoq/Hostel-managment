const db = require('../config/pgDb')


//Student controller
class StudentController {
    async create(params) {
        const student = await db
            .query('insert into student(firstName, lastName, patronymic, birthdate, gender, email, phone, arrivaldate, leavedate, room_id) values ($1, $2, $3,to_date($4, \'DD.MM.YYYY\'),$5,$6,$7,to_date($8, \'DD.MM.YYYY\'),to_date($9, \'DD.MM.YYYY\'),$10) RETURNING *',
                [params.firstname, params.lastname, params.patronymic,
                params.birthdate, params.gender, params.email,
                params.phone, params.arrivaldate, params.leavedate,
                params.room_id])

        return student.rows[0]
    }

    async getStudent(id) {
        let student = (await db.query('SELECT * FROM student where id = $1', [id])).rows[0]
        if (student) {
            const room = await this.loadRoom(student.room_id)
            student.room = room
        }
        return student
    }

    async getStudents() {
        let students = (await db.query('SELECT * FROM student')).rows
        for (var key in students) {
            const room = await this.loadRoom(students[key].room_id)
            students[key].room = room
        }
        return students
    }
    async delete(id) {
        const student = await db.query('DELETE FROM student where id = $1', [id])
        return student.rows[0]
    }
    async update(params, id) {
        const student = await db.query('UPDATE student set firstName=$1, lastName=$2, patronymic=$3, birthdate=to_date($4, \'DD.MM.YYYY\'), gender=$5, email=$6, phone=$7, arrivaldate=to_date($8, \'DD.MM.YYYY\'), leavedate=to_date($9, \'DD.MM.YYYY\'), room_id=$10 where id = $11 RETURNING *',
            [params.firstname, params.lastname, params.patronymic,
            params.birthdate, params.gender, params.email,
            params.phone, params.arrivaldate, params.leavedate,
            params.room_id, id])
        return student.rows[0]
    }

    async find(params) {
        if (Object.keys(params).length === 0) {
            let students = (await db.query('SELECT * FROM student')).rows
            for (var key in students) {
                const room = await this.loadRoom(students[key].room_id)
                students[key].room = room
            }
            return students
        }
        let searchQuery = '';
        if (params.firstname) {
            searchQuery += `firstname=\'${params.firstname}\' and `
        }
        if (params.lastName) {
            searchQuery += `lastName=\'${params.lastName}\' and `
        }
        if (params.patronymic) {
            searchQuery += `patronymic=\'${params.patronymic}\' and `
        }
        if (params.birthdate) {
            searchQuery += `birthdate = to_date(\'${params.birthdate}\', \'DD.MM.YYYY\') and `
        }
        if (params.gender) {
            searchQuery += `gender=\'${params.gender}\' and `
        }
        if (params.email) {
            searchQuery += `email=\'${params.email}\' and `
        }
        if (params.phone) {
            searchQuery += `phone=\'${params.phone}\' and `
        }
        if (params.arrivaldate) {
            searchQuery += `arrivaldate=to_date(\'${params.arrivaldate}\', \'DD.MM.YYYY\') and `
        }
        if (params.leavedate) {
            searchQuery += `leavedate=to_date(\'${params.leavedate}\', \'DD.MM.YYYY\')`
        }
        searchQuery = searchQuery.trim()
        if (searchQuery.slice(searchQuery.length - 1) === 'd') {
            searchQuery = searchQuery.slice(0, searchQuery.length - 3)
        }
        let students = (await db.query(`SELECT * FROM student where ${searchQuery}`)).rows
        for (var key in students) {
            const room = await this.loadRoom(students[key].room_id)
            students[key].room = room
        }
        return students
    }

    async loadRoom(id) {
        const room = await db.query('SELECt * FROM room where id = $1', [id])

        return room.rows[0]
    }
};


module.exports = new StudentController();