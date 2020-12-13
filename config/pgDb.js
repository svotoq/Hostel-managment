const { Pool } = require('pg')

const pool = new Pool({
    user: "postgres",
    password: "1",
    port: "5432",
    host: "localhost",
    database: "hostel"
})

module.exports = pool