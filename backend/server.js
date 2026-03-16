require('dotenv').config();
const farmerRoutes = require('./routes/farmerRoutes');
const db = require('./db');
const express = require('express');
const cors = require('cors');
const cropRoutes = require('./routes/cropRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

 

app.use('/api', authRoutes);
// Use farmer routes
app.use('/api/farmers', farmerRoutes);
app.use('/api/crops', cropRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});