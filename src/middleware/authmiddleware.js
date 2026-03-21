const jwt = require("jsonwebtoken");

exports.requireAuth = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) return res.status(401).json({ message: "Token requerido" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; 
    return next();
  } catch {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
