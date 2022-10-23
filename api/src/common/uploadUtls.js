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

var uploadFile = multer({ storage: storage });
module.exports = uploadFile;