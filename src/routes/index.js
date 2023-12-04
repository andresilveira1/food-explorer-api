const { Router } = require('express')
const usersRouter = require('./users.routes')
const menusRouter = require('./menus.routes')
const favoritesRouter = require('./favorites.routes')
const sessionsRouter = require('./sessions.routes')

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)
routes.use('/menu', menusRouter)
routes.use('/favorites', favoritesRouter)

module.exports = routes
