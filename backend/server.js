require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const patientsRouter = require('./routes/patients');
const doctorsRotuer = require('./routes/doctors');
const appointmentRouter = require('./routes/appointments');

app.use(express.json());
app.use(cors(
    {
        origin: "*", 
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true 
    }
));

app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRotuer);
app.use('/appointments', appointmentRouter);

const port = process.env.PORT || 5000;
let uri = process.env.NODE_ENV === 'test' ? process.env.ATLAS_URI_TEST : process.env.ATLAS_URI;

mongoose.connect(uri)
    .then(() => {
        console.log("Connection to database successful!");
    })
    .catch((err) => {
        console.log("Database connection error:", err);
    });

function getCurrentTime() {
    const date = new Date();
    console.log(date);
}

function getEndDateTime(dateTime) {
    const hrs = (parseInt(dateTime.split('T')[1].split(':')[0]) + 1).toString().padStart(2, '0');
    const time = hrs + ':00:00';
    const date = dateTime.split('T')[0];
    return date + 'T' + time;
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
    getCurrentTime();
    getEndDateTime("2021-03-22T09:00:00");
});

app.get('/', (req, res) => {
    res.status(200).json("Hello");
});

module.exports = app;