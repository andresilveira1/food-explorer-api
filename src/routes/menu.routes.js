const { Router } = require('express')
const MenuController = require('../controllers/MenuController')

const menuRoutes = new Router()
const menuController = new MenuController()

menuRoutes.post('/', menuController.create)

module.exports = menuRoutes
