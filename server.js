const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON data

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change if needed
  password: "", // Your MySQL password
  database: "crud_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
    return;
  }
  console.log("Connected to database.");
});

// Get all food records
app.get("/food", (req, res) => {
  db.query("SELECT * FROM food", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Add a new food
app.post("/food", (req, res) => {
  const { name, description, calories } = req.body;
  if (!name || !description || !calories) {
    return res.status(400).json({ error: "All field needed" });
  }
  db.query(
    "INSERT INTO food (name, description, calories) VALUES (?, ?, ?)",
    [name, description, calories],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: result.insertId, name, description, calories });
    }
  );
});

// Update an food item
app.put("/food/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, calories } = req.body;
  db.query(
    "UPDATE food SET name=?, description=?, calories=? WHERE id=?",
    [name, description, calories, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Food Item updated successfully." });
    }
  );
});

// Delete an item
app.delete("/food/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM food WHERE id=?", [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Item deleted successfully." });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
    