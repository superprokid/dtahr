const express = require('express');
const http = require('http');
const cors = require('cors');
const router = require('../config/routes');
const morgan = require('morgan');
const logger = require('../common/logger')
const { PORT } = require('../config/constants');
const { Server } = require("socket.io");

global.__basedir = __dirname;

const app = express();
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
app.use(cors({ credentials: true, origin: ["http://127.0.0.1:8080", "http://10.0.132.51:4000", "http://26.74.195.215:8080", "http://26.236.42.236:8080"] }));
// Config router
app.use('/api', router);


function run() {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
          origin: "http://127.0.0.1:8080"
        }
    });

    app.get('/index', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    io.on('connection', (socket) => {
        logger.info(`[Server] socker io is ready - user is connected`);

        console.log(`user ${socket.id} is connected.`)

        socket.on('message', data => {
            socket.broadcast.emit('message:received', data)
        })

        socket.on('disconnect', () => {
            console.log(`user ${socket.id} left.`)
        })
    });

    const usePort = process.env.PORT || PORT

    server.listen(usePort, () => {
        logger.info(`[Server] HTTP server running success, listening on port: ${usePort}`)
    })
}

module.exports = {
    run
};