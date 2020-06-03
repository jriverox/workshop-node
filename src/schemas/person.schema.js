const Joi = require('@hapi/joi')
const byIndex = Joi.object().keys({
  index: Joi.number().min(1).required(),
})

const post = Joi.object().keys({
  index: Joi.number().min(1).required(),
  age: Joi.number().min(5).max(100).required(),
  eyeColor: Joi.string().valid('black', 'blue', 'green', 'brown', 'grey').required(),
  name: Joi.string().required(),
  gender: Joi.string().valid('male', 'female').required(),
  company: Joi.string().required(),
  country: Joi.string().length(2).uppercase().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
})

const byQuery = Joi.object().keys({
  age: Joi.number().min(5).max(100),
  eyeColor: Joi.string().valid('black', 'blue', 'green', 'brown', 'grey'),
  name: Joi.string(),
  gender: Joi.string().valid('male', 'female'),
  company: Joi.string(),
  country: Joi.string().length(2).uppercase().required(),
  email: Joi.string().email(),
  page: Joi.number().min(0),
  size: Joi.number().min(5).max(100),
})

module.exports = {
  post,
  byIndex,
  byQuery,
}
