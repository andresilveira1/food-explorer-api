const { Router } = require('express')
const FavoritesController = require('../controllers/FavoritesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const favoritesRoutes = Router()
const favoritesController = new FavoritesController()

favoritesRoutes.use(ensureAuthenticated)

favoritesRoutes.post('/', favoritesController.create)
favoritesRoutes.get('/:user_id', favoritesController.index)
favoritesRoutes.delete('/:id', favoritesController.delete)

module.exports = favoritesRoutes
