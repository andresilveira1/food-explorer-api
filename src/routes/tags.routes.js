const { Router } = require('express')

const TagsController = require('../controllers/TagsController')

const tagsRoutes = Router()
const tagsController = new TagsController()

tagsRoutes.get('/:menu_id', tagsController.index)

module.exports = tagsRoutes
