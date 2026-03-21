const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user_temp");

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan campos: name, email, password" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: "Ese email ya está registrado" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      points: 0,
      level: "Explorador",
      role: "user",
    });

    const token = signToken(user);

    return res.status(201).json({
      message: "Usuario creado",
      token,
      user: { id: user.id, name: user.name, email: user.email, points: user.points, level: user.level },
    });
 } catch (err) {
  console.log(" REGISTER ERROR:", err);
  return res.status(500).json({ message: "Error en registro", error: err.message });
}

};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Faltan campos: email, password" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = signToken(user);

    return res.json({
      message: "Login exitoso",
      token,
      user: { id: user.id, name: user.name, email: user.email, points: user.points, level: user.level },
    });
  } catch (err) {
    return res.status(500).json({ message: "Error en login", error: err.message });
  }
};
