const knex = require('../database/knex')

class OrderListController {
  async create(req, res) {
    const { name, quantity, price, image } = req.body
    const user_id = req.user.id

    await knex('order_list').insert({
      name,
      quantity,
      price,
      image,
      user_id,
    })

    return res.json()
  }

  async index(req, res) {
    const { user_id } = req.params

    const request = await knex('order_list').where({ user_id }).groupBy('name')

    return res.json(request)
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('request').where({ id }).delete()

    return res.json()
  }
}

module.exports = OrderListController
