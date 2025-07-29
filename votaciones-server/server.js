const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// CONFIGURACIÓN DE TU BASE DE DATOS SQL SERVER
const dbConfig = {
  user: 'sa',
  password: 'aaammdsa%112$',
  server: '160.20.247.34',
  database: 'MuOnline',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// RUTA PARA GUARDAR VOTOS
app.post("/api/vote", async (req, res) => {
  const { poll, option } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  try {
    await sql.connect(dbConfig);
    await sql.query`
      INSERT INTO PollVotes (PollName, SelectedOption, VoterIP)
      VALUES (${poll}, ${option}, ${ip})
    `;
    res.status(200).json({ message: "Voto registrado correctamente" });
  } catch (err) {
    console.error("Error al guardar el voto:", err);
    res.status(500).json({ error: "Error al guardar el voto" });
  }
});

// RUTA PARA CONSULTAR RESULTADOS
app.get("/api/results", async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query(`
      SELECT PollName, SelectedOption, COUNT(*) as TotalVotes
      FROM PollVotes
      GROUP BY PollName, SelectedOption
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener resultados" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
