const express = require('express');
const bodyParser = require('body-parser');
const config = require('config')

//Run the app
const app = express();
//use bodyParser
app.use(bodyParser.json());

//Define api routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/rooms", require("./routes/api/rooms"));
app.use("/api/excel", require("./routes/api/excel"));
app.use("/api/students", require("./routes/api/students"));


const PORT = config.get('port') || 5000;


async function start() {
    try {
        app.listen(PORT, () => {
            console.log("App has been started on port ${PORT}...");
        });



    } catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start();


