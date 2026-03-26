const { sendImageToAI } = require("../services/aiService");

const predictImage = async (req, res) => {
  try {
    console.log("=== AI ROUTE HIT ===");

    if (!req.file) {
      console.log("No se recibió req.file");
      return res.status(400).json({
        success: false,
        message: "No se recibió ninguna imagen",
      });
    }

    console.log("Archivo recibido:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    const result = await sendImageToAI(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    console.log("Respuesta IA:", result);

    return res.status(200).json(result);
  } catch (error) {
    console.error("=== AI ERROR REAL ===");
    console.error("message:", error.message);
    console.error("response data:", error.response?.data);
    console.error("response status:", error.response?.status);

    return res.status(500).json({
      success: false,
      message: "Error procesando imagen con IA",
      detail: error.response?.data || error.message,
    });
  }
};

module.exports = { predictImage };