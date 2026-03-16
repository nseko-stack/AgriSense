const db = require("../db");

// Get all farmers with their crop names
const getAllFarmers = (req, res) => {
  const sql = `
    SELECT f.id, f.name, f.location, f.crop, f.created_at, c.name AS crop_name
    FROM farmers f
    LEFT JOIN crops c ON f.crop = c.id
    ORDER BY f.id ASC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get one farmer
const getFarmerById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM farmers WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

// Create farmer
const createFarmer = (req, res) => {
  const { name, location, crop } = req.body;
  const sql = "INSERT INTO farmers (name, location, crop, created_at) VALUES (?, ?, ?, NOW())";
  db.query(sql, [name, location, crop], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId, name, location, crop });
  });
};

// Update farmer
const updateFarmer = (req, res) => {
  const { id } = req.params;
  const { name, location, crop } = req.body;
  const sql = "UPDATE farmers SET name = ?, location = ?, crop = ? WHERE id = ?";
  db.query(sql, [name, location, crop, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};

// Delete farmer
const deleteFarmer = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM farmers WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};

module.exports = { getAllFarmers, getFarmerById, createFarmer, updateFarmer, deleteFarmer };