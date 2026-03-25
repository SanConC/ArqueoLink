const { sendImageToAI } = require("../services/aiService");

const predictImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No se recibió ninguna imagen",
      });
    }

    const result = await sendImageToAI(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Error procesando imagen con IA",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { predictImage };