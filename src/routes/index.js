const { Router } = require('express')

const usersRouter = require('./users.routes')
const menusRouter = require('./menus.routes')
const favoritesRouter = require('./favorites.routes')
const sessionsRouter = require('./sessions.routes')
const tagsRouter = require('./tags.routes')

const routes = Router()

routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)
routes.use('/menus', menusRouter)
routes.use('/favorites', favoritesRouter)
routes.use('/tags', tagsRouter)

module.exports = routes
