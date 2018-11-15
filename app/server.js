const express = require('express')
require('../config/config')

const app = express()

require('../config/middleware')(app)

app.get('/test', (req, res) => {
  res.send('Test received')
})

// Global Error Handling
app.use((req, res) => res.status(404).send(`Resource not found: ${req.path}`))

module.exports = app
