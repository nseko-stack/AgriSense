const db = require("../db");

// Get all crops
const getAllCrops = (req, res) => {
  const sql = "SELECT * FROM crops ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get crop by ID
const getCropById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM crops WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Crop not found" });
    res.json(results[0]);
  });
};

// Create crop
const createCrop = (req, res) => {
  const { name, season, expected_yield } = req.body;
  const sql = "INSERT INTO crops (name, season, expected_yield) VALUES (?, ?, ?)";
  db.query(sql, [name, season, expected_yield], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Crop added successfully", id: results.insertId });
  });
};

// Update crop
const updateCrop = (req, res) => {
  const { id } = req.params;
  const { name, season, expected_yield } = req.body;
  const sql = "UPDATE crops SET name=?, season=?, expected_yield=? WHERE id=?";
  db.query(sql, [name, season, expected_yield, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Crop updated successfully" });
  });
};

// Delete crop
const deleteCrop = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM crops WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Crop deleted successfully" });
  });
};

module.exports = {
  getAllCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
};