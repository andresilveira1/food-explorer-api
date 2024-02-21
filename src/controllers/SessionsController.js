const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body

    const user = await knex('users').where({ email }).first()

    if (!user) {
      throw new AppError('Email e/ou senha incorreta!', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Email e/ou senha incorreta!', 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({ role: user.admin }, secret, {
      subject: String(user.id),
      expiresIn,
    })

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    })

    delete user.password

    return res.json({ user })
  }
}

module.exports = SessionsController
