var multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "shadeImages/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var imageUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = imageUpload;
