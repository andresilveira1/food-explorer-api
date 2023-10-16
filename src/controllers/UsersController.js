const { hash } = require('bcryptjs')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body

    if (!name) {
      throw new AppError('Nome é obrigatório!')
    }

    const userEmailExists = await knex('users')
      .where('email', '=', email)
      .first()

    if (userEmailExists) {
      throw new AppError('E-mail e ou senha já cadastrado!')
    }

    const hashedPassword = await hash(password, 8)

    await knex('users').insert({
      name,
      email,
      password: hashedPassword,
    })

    return res.status(201).json()
  }
}

module.exports = UsersController
