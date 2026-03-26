const axios = require("axios");
const FormData = require("form-data");

async function sendImageToAI(fileBuffer, filename, mimetype) {
  try {
    const form = new FormData();

    form.append("file", fileBuffer, {
      filename: filename || "image.jpg",
      contentType: mimetype || "image/jpeg",
    });

    console.log("Enviando a IA:", {
      url: `${process.env.AI_API_URL}/predict`,
      filename,
      mimetype,
      size: fileBuffer?.length,
    });

    const response = await axios.post(
      `${process.env.AI_API_URL}/predict`,
      form,
      {
        headers: form.getHeaders(),
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    return response.data;
  } catch (error) {
    console.error("=== ERROR EN aiService ===");
    console.error("message:", error.message);
    console.error("response data:", error.response?.data);
    console.error("response status:", error.response?.status);
    throw error;
  }
}

module.exports = { sendImageToAI };