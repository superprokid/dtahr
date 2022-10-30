const multer = require("multer");

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

// let send = multer.

const uploadFile = multer({ storage: storage });
const sendFile = multer({storage: checkInStorage})
module.exports = {
    uploadFile,
    sendFile
};