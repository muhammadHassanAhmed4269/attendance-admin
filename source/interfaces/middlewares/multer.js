const multer = require("multer");

// Multer configuration for profile picture
const profilePictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const uploadProfilePicture = multer({ storage: profilePictureStorage }).single(
  "profilePicture"
);

// Multer configuration for NIC front picture
const nicFrontPictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/nic_front/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const uploadNicFrontPicture = multer({
  storage: nicFrontPictureStorage,
}).single("frontPicture");

// Multer configuration for NIC back picture
const nicBackPictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/nic_back/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const uploadNicBackPicture = multer({ storage: nicBackPictureStorage }).single(
  "backPicture"
);

module.exports = {
  uploadProfilePicture,
  uploadNicFrontPicture,
  uploadNicBackPicture,
};
