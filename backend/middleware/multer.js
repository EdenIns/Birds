const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "assets/images");
  },
  filename: (req, file, callback) => {

    const name = file.originalname.split('.')[0].split(" ").join("_");
    console.log(name)

    const extension = MIME_TYPES[file.mimetype];
    console.log(extension)

    callback(null, name + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("imageUrl");
