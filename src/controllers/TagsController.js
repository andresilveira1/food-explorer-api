const knex = require('../database/knex')

class TagsController {
  async index(req, res) {
    const { menu_id } = req.params

    const tags = await knex('tags').where({ menu_id }).groupBy('name')

    return res.json(tags)
  }
}

module.exports = TagsController
