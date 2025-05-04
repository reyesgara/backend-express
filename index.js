// Import required modules
const express = require('express');
const cors = require('cors'); // Asegúrate de que cors esté importado
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3001;

// Usar CORS
app.use(cors());

// Configurar otras rutas
app.get('/', (req, res) => {
  res.send('CORS is enabled');
});

// Connect to the SQLite database file (make sure this path is correct)
const db = new sqlite3.Database('C:/Users/María/database.db', (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Root route - quick check to see if server is running
app.get('/', (req, res) => {
  res.send('Hello, your Express.js server is running with SQLite!');
});

// /lorem route - sends all rows from the "lorem" table as JSON
app.get('/lorem', (req, res) => {
  db.all('SELECT * FROM lorem', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // If no data found, send a custom message
    if (rows.length === 0) {
      res.json({ message: 'No data found in the lorem table' });
    } else {
      res.json({ data: rows });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
