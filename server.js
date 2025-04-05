const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// SQL Server configuration (Azure SQL)
const config = {
  user: "azureuser",                     // from your connection string
  password: "Norcross2025!",       // your actual password
  server: "mysqlserver8585.database.windows.net", // host without port
  database: "myDatabase",               // from your connection string
  options: {
    encrypt: true,                      // required for Azure
    trustServerCertificate: false       // also required for Azure
  }
};

sql.connect(config)
  .then(() => console.log("Connected to Azure SQL Database."))
  .catch((err) => console.error("DB connection error: ", err));

// Get all food records
app.get("/food", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM food");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new food
app.post("/food", async (req, res) => {
  const { name, description, calories } = req.body;
  if (!name || !description || !calories) {
    return res.status(400).json({ error: "All fields needed" });
  }

  try {
    await sql.query`INSERT INTO food (name, description, calories) VALUES (${name}, ${description}, ${calories})`;
    res.json({ message: "Food item added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an food item
app.put("/food/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, calories } = req.body;

  try {
    await sql.query`UPDATE food SET name=${name}, description=${description}, calories=${calories} WHERE id=${id}`;
    res.json({ message: "Food item updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an item
app.delete("/food/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await sql.query`DELETE FROM food WHERE id=${id}`;
    res.json({ message: "Food item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
    