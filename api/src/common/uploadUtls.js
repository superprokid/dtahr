const multer = require("multer");
const fs = require('fs');
const logger = require("../common/logger");

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __basedir + "/public/avts");
    },
    filename: (req, file, callback) => {
        if (!file.mimetype.startsWith("image")) {
            let errorMess = "Just upload image";
            return callback(errorMess, null);
        }
        let filename = Date.now().toString() + "_" + file.originalname;
        callback(null, filename);
    }
});

let checkInStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __basedir + "/public/checkin");
    },
    filename: (req, file, callback) => {
        if (!file.mimetype.startsWith("image")) {
            let errorMess = "Just upload image";
            return callback(errorMess, null);
        }
        let filename = Date.now().toString() + "_" + file.originalname;
        callback(null, filename);
    }
});

let attachmentStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const dirPath = __basedir + "/public/attachments/" + Date.now().toString();
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
        }
        req.dirPath = dirPath;
        callback(null, dirPath);
    },
    filename: (req, file, callback) => {
        let filename = file.originalname;
        callback(null, filename);
    }
});

// let send = multer.

const uploadFile = multer({ storage: storage });
const sendFile = multer({storage: checkInStorage})
const attachment = multer({storage: attachmentStorage})
module.exports = {
    uploadFile,
    sendFile,
    attachment,
};