/**
 * person.route.js
 * Expone los puntos de entrada a traves de endpoints, es el encargado de recibir las solicitudes http que los usuarios o clientes del api nos envia.
 * puede contener diferentes rutas usando combinaciones de diferentes verbos http y parametros
 * por ejemplo:
 * router.get('person/byIndex', '/:index', controller.getByIndex) maneja la solicitudes desde person/99 donde 99 es el valor del parametro index
 */
const KoaRouter = require('koa-router')
const PersonController = require('../controllers/person.controller')
const personSchemas = require('../schemas/person.schema')
const schemaValidator = require('../utils/schema-validator')

const router = new KoaRouter({ prefix: '/person' })
const controller = new PersonController()
const byIndexValidator = schemaValidator({ params: personSchemas.byIndex })
const postValidator = schemaValidator({ body: personSchemas.post })
const byQueryValidator = schemaValidator({ query: personSchemas.byQuery })

// GET /person/29
router.get('person/byIndex', '/:index', byIndexValidator, controller.getByIndex)

// POST
router.post('person/post', '/', postValidator, controller.save)

// GET /person?country=PE&gender=female&page=2&size=5
// Puede recibir cualquiera de los parametros definidos en el schema byQuery de person.schema.js
router.get('person/byQuery', '/', byQueryValidator, controller.getByQuery)
module.exports = router
