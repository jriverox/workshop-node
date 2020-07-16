// src/app.js
const Koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const yenv = require('yenv')
const mongoose = require('mongoose')

const env = yenv()
const routes = require('./routes')
const apiError = require('./utils/api-error')
const LogManager = require('./utils/logging/log-manager')
const docs = require('./utils/api-docs')
// Inicializar nuestro servidor usando koa (similar a express)
const app = new Koa()
const logManager = new LogManager()
// Inicializar los middleware
app.use(bodyParser()).use(json()).use(logger()).use(apiError).use(docs)

// cargar los routes que escucharan las peticiones http
routes.map((item) => {
  app.use(item.routes()).use(item.allowedMethods())
})

app.on('error', (err, ctx) => {
  const isOperationalError = logManager.error(err)
  if (!isOperationalError) {
    process.exit(1)
  }
})

mongoose.connect(env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Error...'))

module.exports = app
