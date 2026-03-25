const express = require("express");
const multer = require("multer");
const { predictImage } = require("../controllers/aicontroller");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post("/predict", upload.single("image"), predictImage);

module.exports = router;