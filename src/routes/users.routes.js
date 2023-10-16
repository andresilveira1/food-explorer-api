const { Router } = require('express')
const UsersController = require('../controllers/UsersController')

const usersRoutes = new Router()
const usersController = new UsersController()

usersRoutes.post('/', usersController.create)

module.exports = usersRoutes
