const { Router } = require('express')

const usersRouter = require('./users.routes')
const menusRouter = require('./menus.routes')
const favoritesRouter = require('./favorites.routes')
const sessionsRouter = require('./sessions.routes')
const tagsRouter = require('./tags.routes')
const orderListRouter = require('./orderList.routes')

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)
routes.use('/menus', menusRouter)
routes.use('/favorites', favoritesRouter)
routes.use('/tags', tagsRouter)
routes.use('/payment', orderListRouter)

module.exports = routes
