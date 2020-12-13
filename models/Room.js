const db = require('../config/pgDb')


//Room controller
class RoomController {
    async createRoom(params) {
        const room = await db.query('INSERT INTO room(storeRoom, roomNumber, roomSize) values ($1, $2, $3) RETURNING *', [params.storeRoom, params.roomNumber, params.roomSize])
        return room.rows[0]
    }

    async getRoom(id) {
        let room = (await db.query('SELECT * FROM room where id = $1', [id])).rows[0]
        if (room) {
            const students = await this.loadStudents(room.id)
            room.students = students
        }
        return room
    }

    async getRooms() {
        let rooms = (await db.query('SELECT * FROM room')).rows
        for (var key in rooms) {
            const students = await this.loadStudents(rooms[key].id)
            rooms[key].students = students
        }
        return rooms
    }
    async deleteRoom(id) {
        const room = await db.query('DELETE FROM room where id = $1', [id])
        return room.rows[0]
    }
    async update(params) {
        const room = await db.query('UPDATE room set roomSize = $1, roomNumber = $2, storeRoom = $3 where id = $4 RETURNING *',
            [Number(params.roomsize), params.roomnumber, Boolean(params.storeroom), params.id])
        return room.rows[0]
    }

    async findRoom(roomnumber) {
        const room = await db.query('SELECT * FROM room where roomNumber = $1', [roomnumber])
        return room.rows[0]
    }
    async find(params) {
        if (Object.keys(params).length === 0) {
            let rooms = (await db.query('SELECT * FROM room')).rows
            for (var key in rooms) {
                const students = await this.loadStudents(rooms[key].id)
                rooms[key].students = students
            }
            return rooms
        }
        let searchQuery = '';
        if (params.roomnumber) {
            searchQuery += `roomnumber=\'${params.roomnumber}\' and `
        }
        if (params.roomsize) {
            searchQuery += `roomsize=${params.roomsize} and `
        }
        if (params.storeroom) {
            searchQuery += `storeroom=${params.storeroom}`
        }
        searchQuery = searchQuery.trim()
        if (searchQuery.slice(searchQuery.length - 1) === 'd') {
            searchQuery = searchQuery.slice(0, searchQuery.length - 3)
        }
        let rooms = (await db.query(`SELECT * FROM room where ${searchQuery}`)).rows
        for (var key in rooms) {
            const students = await this.loadStudents(rooms[key].id)
            rooms[key].students = students
        }
        return rooms
    }

    async loadStudents(id) {
        const students = await db.query('SELECt * FROM student where room_id = $1', [id])
        return students.rows
    }
};


module.exports = new RoomController();