const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./src/config/db");

// IMPORTAR RUTAS
const authRoutes = require("./src/routes/authRoutes");
const deviceRoutes = require("./src/routes/deviceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// RUTAS
app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRoutes);

app.get("/", (req, res) => {
  res.send("Servidor de World-Tech funcionando 🚀");
});

// PROBAR CONEXIÓN A MARIA DB
async function conectarBD() {
  try {
    await db.query("SELECT 1");
    console.log("✅ MariaDB conectada");
  } catch (err) {
    console.error("❌ Error de conexión:", err.message);
  }
}

conectarBD();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});