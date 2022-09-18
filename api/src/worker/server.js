const express = require('express');
const app = express();
const cors = require('cors');
const router = require('../config/routes');
const morgan = require('morgan')
// let cookieParser = require('cookie-parser')

global.__basedir = __dirname;
// morgan.token('id', (req) => req.id.split('-')[0])
app.use(express.json());
// app.use(cookieParser())
app.use(express.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");// update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

// Config logger
app.use(morgan('[:method] url=:url status=:status :res[content-length] - :response-time ms'));

// IP của client
app.use(cors({ credentials: true, origin: ["http://192.168.1.9:4000", "http://10.0.132.51:4000"] }));

// Config router
app.use('/api', router);

module.exports = app;