require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./src/config/database");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a MySQL (Sequelize)");
    
    app.listen(PORT, '0.0.0.0', () => {
  console.log(`API corriendo en puerto ${PORT}`);
});
  } catch (err) {
    console.error(" Error conectando a MySQL:", err.message);
    process.exit(1);
  }
})();
