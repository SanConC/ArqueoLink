const findingroutes = require("./routers/findingroutes");


const express = require("express");
const cors = require("cors");

const authroutes = require("./routers/authroutes");

const app = express();

const aiRoutes = require("./routers/airoutes");
app.use("/api/ai", aiRoutes);

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use("/api/findings", findingroutes);

app.get("/", (req, res) => res.json({ message: "ArchTen API OK" }));

app.use("/api/auth", authroutes);

module.exports = app;
