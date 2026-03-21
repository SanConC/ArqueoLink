const Finding = require("../models/finding");

exports.createFinding = async (req, res) => {
  try {
    const {
      title,
      description,
      latitude,
      longitude,
      ai_label,
      ai_confidence,
    } = req.body;

    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const finding = await Finding.create({
      user_id: req.user.id,
      title,
      description,
      latitude,
      longitude,
      image_url,
      ai_label,
      ai_confidence,
    });

    return res.status(201).json({
      message: "Hallazgo creado",
      finding,
    });
  } catch (err) {
    console.log(" CREATE FINDING ERROR:", err);
    return res.status(500).json({
      message: "Error creando hallazgo",
      error: err.message,
    });
  }
};

exports.getMyFindings = async (req, res) => {
  try {
    const findings = await Finding.findAll({
      where: { user_id: req.user.id },
      order: [["id", "DESC"]],
    });

    return res.json({ findings });
  } catch (err) {
    console.log("GET FINDINGS ERROR:", err);
    return res.status(500).json({
      message: "Error obteniendo hallazgos",
      error: err.message,
    });
  }
};