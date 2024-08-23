const mysql = require('mysql2');

async function addSchools(req, res) {
    const { name, address, latitude, longitude } = req.body;
  
    // validation
    if (!name || !address || isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) {
      return res.status(400).json({ error: 'Invalid input data. Ensure all fields are provided and have the correct data types.' });
    }
  
    try {
      
      const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
      const [result] = await req.db.query(sql, [name, address, parseFloat(latitude), parseFloat(longitude)]);
  
      
      res.status(201).json({ message: 'School added successfully.', id: result.insertId });
    } catch (error) {
      console.error('Error adding school:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    return distance;
  }
  

async function listSchools(req, res) {
    const { latitude, longitude } = req.query;
  

    if (!latitude || !longitude || isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) {
      return res.status(400).json({ error: 'Invalid input. Provide valid latitude and longitude.' });
    }
  
    try {

      const sql = 'SELECT id, name, address, latitude, longitude FROM schools';
      const [rows] = await req.db.query(sql);
      const sortedSchools = rows.map(school => {
        const distance = calculateDistance(latitude, longitude, school.latitude, school.longitude);
        return { ...school, distance };
      }).sort((a, b) => a.distance - b.distance);
      res.json(sortedSchools);
    } catch (error) {
      console.error('Error listing schools:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

module.exports ={addSchools,listSchools}