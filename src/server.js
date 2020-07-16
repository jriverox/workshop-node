// src/server.js
const yenv = require('yenv')
const app = require('./app')
const env = yenv()
app.listen(env.PORT, () => {
  console.log(`Escuchando en el puerto ${env.PORT}`)
})
