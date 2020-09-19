const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { info } = require('../utils/logger')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (body.username === undefined || body.password === undefined) {
      response.status(400).json({
        error: 'content missing'
      })
    } else if (body.username.length<3 || body.password.length<3) {
      response.status(400).json({
        error: 'username and password must be at least 3 characters'
      })
    } else {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })

      const savedUser = await user.save()

      response.json(savedUser)
    }
  } catch (exception) {
    if (exception.name === 'ValidationError') {
      response.status(400).send({ error: exception.message })
    } else {
      info('not handled')
      next(exception)
    }
  }
})

module.exports = usersRouter