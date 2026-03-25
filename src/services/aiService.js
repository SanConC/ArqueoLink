const axios = require("axios");
const FormData = require("form-data");

async function sendImageToAI(fileBuffer, filename, mimetype) {
  const form = new FormData();

  form.append("file", fileBuffer, {
    filename: filename || "image.jpg",
    contentType: mimetype || "image/jpeg",
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
}

module.exports = { sendImageToAI };