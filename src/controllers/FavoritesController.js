const knex = require('../database/knex')

class FavoritesController {
  async create(req, res) {
    const { menu_id } = req.body
    const user_id = req.user.id

    await knex('favorites').insert({
      user_id,
      menu_id,
    })

    return res.json()
  }

  async index(req, res) {
    const { user_id } = req.params

    const fav = await knex('menus')
      .select([
        'menus.name',
        'menus.image',
        'favorites.id',
        'favorites.menu_id',
      ])
      .where('favorites.user_id', '=', user_id)
      .innerJoin('favorites', 'favorites.menu_id', 'menus.id')
      .groupBy('menus.name')

    return res.json(fav)
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('favorites').where({ id }).delete()

    return res.json()
  }
}

module.exports = FavoritesController
