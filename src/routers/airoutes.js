const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const router = express.Router();

const uploadDir = path.join(__dirname, "../../temp_uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || ".jpg");
    cb(null, `img_${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.post("/predict", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Imagen requerida" });
    }

    const imagePath = req.file.path;

    const pythonPath = "C:/Users/santi/.venv/Scripts/python.exe";
    const scriptPath = "C:/PROYECTOS/archten_ai/predict.py";

    execFile(
      pythonPath,
      [scriptPath, imagePath],
      { cwd: "C:/PROYECTOS/archten_ai" },
      (error, stdout, stderr) => {
        fs.unlink(imagePath, () => {});

        if (error) {
          console.error(" Error ejecutando Python:", error);
          console.error(stderr);
          return res.status(500).json({
            message: "Error ejecutando IA",
            error: stderr || error.message,
          });
        }

        try {
          const lines = stdout
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l);

          const jsonLine = lines[lines.length - 1];
          const result = JSON.parse(jsonLine);

          return res.json(result);
        } catch (parseError) {
          console.error(" Error parseando salida Python:", parseError);
          console.error("STDOUT:", stdout);
          return res.status(500).json({
            message: "Error leyendo respuesta de IA",
            error: parseError.message,
          });
        }
      }
    );
  } catch (e) {
    return res.status(500).json({ message: "Error IA", error: e.message });
  }
});

module.exports = router;