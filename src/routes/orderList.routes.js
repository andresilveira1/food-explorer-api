const { Router } = require('express')
const OrderListController = require('../controllers/OrderListController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const orderListRoutes = Router()
const orderListController = new OrderListController()

orderListRoutes.use(ensureAuthenticated)

orderListRoutes.post('/', orderListController.create)
orderListRoutes.get('/:user_id', orderListController.index)
orderListRoutes.delete('/:id', orderListController.delete)

module.exports = orderListRoutes
