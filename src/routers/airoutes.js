const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/predict", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Imagen requerida" });
    }

    // Simulación de IA (para que funcione el proyecto)
    return res.json({
      label: "POTENCIAL ARQUEOLOGICO",
      score: 0.85,
    });

  } catch (e) {
    return res.status(500).json({
      message: "Error IA",
      error: e.message,
    });
  }
});

module.exports = router;