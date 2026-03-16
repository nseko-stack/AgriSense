const db =  require('../db');

const Farmer = {};

// Get all farmers
Farmer.getAll = (callback) => {
    const query = 'SELECT * FROM farmers';
    db.query(query, callback);
};

// Get a farmer by ID
Farmer.getById = (id, callback) => {
    const query = 'SELECT * FROM farmers WHERE id = ?';
    db.query(query, [id], callback);
};

// Create a new farmer
Farmer.create = (data, callback) => {
    const query = 'INSERT INTO farmers (name, location, crop) VALUES (?, ?, ?)';
    db.query(query, [data.name, data.location, data.crop], callback);
};

// Update a farmer
Farmer.update = (id, data, callback) => {
    const query = 'UPDATE farmers SET name = ?, location = ?, crop = ? WHERE id = ?';
    db.query(query, [data.name, data.location, data.crop, id], callback);
};

// Delete a farmer
Farmer.delete = (id, callback) => {
    const query = 'DELETE FROM farmers WHERE id = ?';
    db.query(query, [id], callback);
};

module.exports = Farmer;
