//__tests__/person/person.unit.test.js
const { createMockContext } = require('@shopify/jest-koa-mocks')
const PersonController = require('../../src/controllers/person.controller')
const PersonModel = require('../../src/models/person.model')
const AppError = require('../../src/utils/logging/app-error')
const person = {
  _id: '5ec928506f54870b72479654',
  index: 1000,
  address: '921 Karweg Place, Connerton, Arkansas, 3696',
  age: 99,
  company: 'Belcorp',
  country: 'PE',
  email: 'pepe.trueno@email.com',
  eyeColor: 'brown',
  gender: 'male',
  name: 'Pepe Trueno',
  phone: '+1 (900) 521-2063',
}

let ctx = {}
let controller

describe('Person Service', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'development'
    controller = new PersonController()
  })

  describe('Get person by Index', () => {
    beforeEach(() => {
      PersonModel.findOne = jest.fn()
    })

    it('When pass an index of existing person, should return person data successfully ', async () => {
      // Arrage
      PersonModel.findOne.mockReturnValue(person)
      ctx = createMockContext({
        method: 'GET',
        // url: '/person/1000',
        // statusCode: 200,
        customProperties: { params: { index: 1000 } },
        state: person,
      })
      // Act
      await controller.getByIndex(ctx)
      // Assert
      expect(ctx.status).toBe(200)
      expect(ctx.body).toBe(person)
    })

    it('When pass an index of non-existing person. should return 404 error', async () => {
      PersonModel.findOne.mockReturnValue(null)
      ctx = createMockContext({
        method: 'GET',
        // url: '/person/1000',
        statusCode: 404,
        customProperties: { params: { index: 200000 } },
        state: null,
      })

      // Acts
      //await expect(controller.getByIndex(ctx)).rejects.toThrow()

      try {
        await controller.getByIndex(ctx)
      } catch (error) {
        expect(error).toBeInstanceOf(AppError)
        expect(error.isOperational).toBeTruthy()
        expect(error.status).toBe(404)
      }
    })
  })
})