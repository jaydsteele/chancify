const app = require('./app/server')
const config = require('./config/config')

app.listen(config.port, () => {
  console.log(`Connected to http://localhost:${config.port}`)
})