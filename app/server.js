const express = require('express');
const app = express();
const config = require('../config/config');

require('../config/middleware')(app);

app.get('/test', (req, res) => {
  res.send('Test received')
})

// Global Error Handling
app.use((req, res) => {
  return res.status(404).send(`Resource not found: ${req.path}`);
});

module.exports = app;