/**
 * person.controller.js
 * Responsable por recibir las solicitudes http desde el router person.route.js
 */
const PersonRepository = require('../repositories/person.repository')
const repository = new PersonRepository()

module.exports = class PersonController {
  /**
   *
   * @param {object} ctx: contexto de koa que contiene los parameteros de la solicitud, en este caso
   * desde el url de donde sacaremos el valor del parametro index (ctx.params.index)
   */
  async getByIndex(ctx) {
    const index = ctx.params.index && !isNaN(ctx.params.index) ? parseInt(ctx.params.index) : 0
    if (index > 0) {
      const filter = { index: index }
      const data = await repository.findOne(filter)
      if (data) {
        ctx.body = data
      } else {
        ctx.throw(404, `No se ha encontrado la persona con el indice ${index}`)
      }
    } else {
      ctx.throw(422, `Valor ${ctx.params.index} no soportado`)
    }
  }

  /**
   *
   * @param {object} ctx: contexto de koa que contiene los parameteros de la solicitud, en este caso desde el body,
   * obtendremos las propiedades de la persona a guardar a traves de ctx.request.body
   */
  async save(ctx) {
    const person = ctx.request.body
    await repository.save(person, true)
    ctx.body = person
  }

  async getByQuery(ctx) {
    if (ctx.query) {
      const filter = Object.assign({}, ctx.query)
      if (ctx.query.page) delete filter.page
      if (ctx.query.size) delete filter.size
      const page = ctx.query.page && !isNaN(ctx.query.page) ? parseInt(ctx.query.page) : 1
      const size = ctx.query.size && !isNaN(ctx.query.size) ? parseInt(ctx.query.size) : 10
      const data = await repository.find(filter, page, size)
      if (data) {
        ctx.body = data
      } else {
        ctx.throw(404, `No se ha encontrado personas que cumplan son el query ${ctx.query}`)
      }
      ctx.body = data
    } else {
      ctx.throw(422, 'Debe proporcionar algun parametro')
    }
  }
}
