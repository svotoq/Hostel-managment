const db = require('../config/pgDb')


//Room controller
class UserController {
    async create(email, password) {
        const room = await db.query('INSERT INTO userAdmin(email, password) values ($1, $2) RETURNING *', [email, password])
        return room.rows[0]
    }
    
    async getUser(id) {
        const user = await db.query('SELECT * FROM userAdmin where id = $1', [id])
        return user.rows[0]
    }

    async getUsers() {
        const user = await db.query('SELECT * FROM userAdmin')
        return user.rows
    }

    async deleteUser(id) {
        const user = await db.query('DELETE FROM userAdmin where id = $1 RETURNING *', [id])
        return user.rows[0]
    }

    async findOne(email) {
        const user = await db.query('SELECT * FROM userAdmin where email = $1', [email])
        return user.rows[0]
    }
}
module.exports = new UserController()