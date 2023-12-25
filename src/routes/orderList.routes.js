const { Router } = require('express')
const OrderListController = require('../controllers/OrderListController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const orderListRoutes = Router()
const orderListController = new OrderListController()

orderListRoutes.post('/', ensureAuthenticated, orderListController.create)

module.exports = orderListRoutes
