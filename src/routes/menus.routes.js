const { Router } = require('express')
const multer = require('multer')

const uploadConfig = require('../configs/upload')
const MenusController = require('../controllers/MenusController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const MenusImageController = require('../controllers/MenusImageController')
const verifyUserAuthenticated = require('../middlewares/verifyUserAuthorization')

const menusRoutes = Router()
const menusController = new MenusController()
const menusImageController = new MenusImageController()

const upload = multer(uploadConfig.MULTER)

menusRoutes.post(
  '/',
  ensureAuthenticated,
  verifyUserAuthenticated(1),
  upload.single('image'),
  menusController.create,
)
menusRoutes.put(
  '/:menu_id',
  ensureAuthenticated,
  verifyUserAuthenticated(1),
  menusController.update,
)
menusRoutes.patch(
  '/img/:menu_id',
  ensureAuthenticated,
  verifyUserAuthenticated(1),
  upload.single('image'),
  menusImageController.update,
)
menusRoutes.get('/', menusController.index)
menusRoutes.get('/:id', menusController.show)
menusRoutes.delete(
  '/:menu_id',
  ensureAuthenticated,
  verifyUserAuthenticated(1),
  menusController.delete,
)

module.exports = menusRoutes
