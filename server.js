const express = require('express');
const connectDb = require('./config/db');
const bodyParser = require('body-parser');


//Run the app
const app = express();

//Connect to db
connectDb();


//use bodyParser
app.use(bodyParser.json());

//Define api routes
app.use("/api/rooms", require("./routes/api/rooms"));

//start server
app.listen(4000, () => {
    console.log("Server is listenning");
});