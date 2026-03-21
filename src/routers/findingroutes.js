const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const { requireAuth } = require("../middleware/authmiddleware");
const {
  createFinding,
  getMyFindings,
} = require("../controllers/findingcontroller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || ".jpg");
    cb(null, `finding_${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.post("/", requireAuth, upload.single("image"), createFinding);
router.get("/mine", requireAuth, getMyFindings);

module.exports = router;