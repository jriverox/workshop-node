// src/utils/api-docs.js
const path = require('path')
const swagger = require('swagger2')
const { ui } = require('swagger2-koa')
// indicar la ruta fisica del archivo docs.yaml utils/docs.yaml
const file = path.join(__dirname, 'docs.yaml')
const document = swagger.loadDocumentSync(file)
// exponer la documentación en la ruta /docs
module.exports = ui(document, '/docs')
