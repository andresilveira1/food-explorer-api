const knex = require('../database/knex')

class OrderListController {
  async create(req, res) {
    const { quantity, menu_id } = req.body
    const user_id = req.user.id

    await knex('order_list').insert({
      quantity,
      menu_id,
      user_id,
    })

    return res.json()
  }

  async index(req, res) {
    const { user_id } = req.params

    const request = await knex('menus')
      .select([
        'menus.name',
        'menus.image',
        'menus.price',
        'order_list.id',
        'order_list.quantity',
        'order_list.menu_id',
      ])
      .where('order_list.user_id', '=', user_id)
      .innerJoin('order_list', 'order_list.menu_id', 'menus.id')
      .groupBy('menus.name')

    return res.json(request)
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('order_list').where({ id }).delete()

    return res.json()
  }
}

module.exports = OrderListController
