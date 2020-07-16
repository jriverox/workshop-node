//__tests__/person/person.int.test.js
const supertest = require('supertest')
const mongoose = require('mongoose')
// referenciar el archivo de la aplicacion
const app = require('../../src/app')

describe('Person Service', () => {
  afterAll((done) => {
    mongoose.disconnect()
    done()
  })

  describe('Get Person by Index', () => {
    it('When pass an index of existing person, should return person data successfully', async () => {
      const personIndex = 1000
      const response = await supertest(app.callback()).get(`/person/${personIndex}`)

      expect(response.status).toBe(200)
      expect(response.body.index).toBe(personIndex)
    })

    it('When pass an index of non-existing person. should return 404 error', async () => {
      const personIndex = 200000
      const response = await supertest(app.callback()).get(`/person/${personIndex}`)

      expect(response.status).toBe(404)
    })

    it('When pass an index of non-existing person. should return 422 error', async () => {
      const personIndex = 'xxxxx'
      const response = await supertest(app.callback()).get(`/person/${personIndex}`)

      expect(response.status).toBe(422)
    })
  })

  describe('Save Person', () => {
    it('When try to save a person that already exists. Should update successfully', async () => {
      const person = {
        index: 1000,
        address: '921 Karweg Place, Connerton, Arkansas, 3696',
        age: 36,
        company: 'BELCORP',
        country: 'PE',
        email: 'beachrutledge@urbanshee.com',
        eyeColor: 'black',
        gender: 'male',
        name: 'Pepe Trueno',
        phone: '+1 (900) 521-2063',
      }
      const response = await supertest(app.callback()).post('/person').send(person).set('Accept', 'application/json')

      expect(response.status).toBe(200)
    })

    it('When try to save a person without required property. Should return 422 status', async () => {
      const person = {
        address: '921 Karweg Place, Connerton, Arkansas, 3696',
        company: 'BELCORP',
        country: 'PE',
        email: 'beachrutledge@urbanshee.com',
        eyeColor: 'black',
        gender: 'male',
        name: 'Pepe Trueno',
        phone: '+1 (900) 521-2063',
      }

      const response = await supertest(app.callback()).post('/person/').send(person)

      expect(response.status).toBe(422)
    })

    it('When try to save a person with malformed request json body. Should return 422 status', async () => {
      const person = {
        x: 'aaaaa',
      }

      const response = await supertest(app.callback()).post('/person/').send(person)

      expect(response.status).toBe(422)
    })
  })
})