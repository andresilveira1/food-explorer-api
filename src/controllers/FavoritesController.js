const knex = require('../database/knex')

class FavoritesController {
  async create(req, res) {
    const { name, menu_id, image } = req.body
    const user_id = req.user.id

    await knex('favorites').insert({
      name,
      image,
      user_id,
      menu_id,
    })

    return res.json()
  }

  async index(req, res) {
    const { user_id } = req.params

    const fav = await knex('favorites').where({ user_id }).groupBy('name')

    return res.json(fav)
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('favorites').where({ id }).delete()

    return res.json()
  }
}

module.exports = FavoritesController
