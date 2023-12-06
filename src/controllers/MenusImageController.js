const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class MenusImageController {
  async update(req, res) {
    const { menu_id } = req.params
    const imgFileName = req.file.filename

    const diskStorage = new DiskStorage()

    const menu = await knex('menus').where({ id: menu_id }).first()

    if (!menu) {
      throw new AppError(
        'O prato que você está tentando modificar não existe!',
        401,
      )
    }

    if (menu.image) {
      await diskStorage.deleteFile(menu.image)
    }

    const filename = await diskStorage.saveFile(imgFileName)
    menu.image = filename

    await knex('menus').update(menu).where({ id: menu_id })

    return res.json(menu)
  }
}

module.exports = MenusImageController
