const express = require("express");
const cors = require("cors");
const path = require("path");

const authroutes = require("./routers/authroutes");
const findingroutes = require("./routers/findingroutes");
const aiRoutes = require("./routers/airoutes");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authroutes);
app.use("/api/findings", findingroutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ArchTen API OK" });
});

module.exports = app;