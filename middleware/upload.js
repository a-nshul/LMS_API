const multer = require('multer');
const path = require('path');

// Storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Name file as the timestamp to prevent duplicates
  },
});

// Create the upload middleware
const upload = multer({ storage });

module.exports = upload;
