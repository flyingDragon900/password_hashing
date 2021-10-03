const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MONGODB_URI = "mongodb://localhost:27017/password_hashing?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const app = express();
const port = 3000;

// Connection to mongoDB
mongoose.connect(MONGODB_URI, () => {
    console.log("Connected to Mongo Successfully");
})
//Using bodyparser to parse json data
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send("Hello World")
})
app.use('/api/user', require('./routes/User'))
app.listen(port, () => {
    console.log(`The app is listening on port http://localhost:${port}`);
})
