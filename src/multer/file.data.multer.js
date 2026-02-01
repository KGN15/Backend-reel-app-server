const multer = require("multer");

const storage = multer.memoryStorage(); // ✅ memory

const fileFilter = (req, file, cb) => {
  const allowedExt = /mp4|mkv|avi|mov/;
  if (allowedExt.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("❌ Only video files allowed"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter,
});

module.exports = upload;
