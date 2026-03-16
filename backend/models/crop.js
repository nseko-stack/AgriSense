const db = require('../db');

const Crop = {};

// Get all crops

Crop.getAll = (callback) => {
    const query = 'SELECT * FROM crops';
    db.query(query, callback);
};

// Get crop by ID
Crop.getById = (id, callback) => {
    const query = 'SELECT * FROM crops WHERE id = ?';
    db.query(query, [id], callback);
};

// CREATE crop

Crop.create = (data, callback) => {
    const query = 'INSERT INTO crops (name, season, expected_yield) VALUES (?, ?, ?)';
    db.query(query, [data.name, data.season, data.expected_yield], callback);
};

//UPDATE crop

Crop.update = (id, data, callback) => {
    const query = 'UPDATE crops SET name = ?, season = ?, expected_yield = ? WHERE id = ?';
    db.query(query, [data.name, data.season, data.expected_yield, id], callback);
};

//DELETE crop

Crop.delete = (id, callback) => {
    const query = 'DELETE FROM crops WHERE id = ?';
    db.query(query, [id], callback);
};

module.exports = Crop;