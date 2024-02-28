const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class MenusController {
  async create(req, res) {
    const { name, description, price, ingredient, category } = req.body
    const user_id = req.user.id

    const [menu_id] = await knex('menus').insert({
      name,
      description,
      price,
      category,
      user_id,
    })

    const tagsInsert = ingredient.map((name) => {
      return {
        menu_id,
        name,
      }
    })

    await knex('tags').insert(tagsInsert)

    return res.json({ menu_id })
  }

  async update(req, res) {
    const { name, description, price, ingredient, category } = req.body
    const { menu_id } = req.params
    const user_id = req.user.id

    if (!name || !description || !price || !ingredient) {
      throw new AppError('Você deve preencher todos os campos do formulário')
    }

    await knex('menus').where('id', '=', menu_id).update({
      name,
      description,
      price,
      category,
      user_id,
      updated_at: knex.fn.now(),
    })

    const tagsInsert = ingredient.map((name) => {
      return {
        menu_id,
        name,
      }
    })

    await knex('tags').where('menu_id', '=', menu_id).delete()
    await knex('tags').insert(tagsInsert)

    return res.json()
  }

  async index(req, res) {
    const { name, tag } = req.query

    let menu

    if (!name) {
      menu = await knex('menus')
    } else {
      menu = await knex('tags')
        .select(['menus.id', 'menus.name'])
        .whereLike('menus.name', `%${name}%`)
        .orWhereLike('tags.name', `%${tag}%`)
        .innerJoin('menus', 'menus.id', 'tags.menu_id')
        .groupBy('menus.id')
        .orderBy('menus.name')
    }

    const menuTags = await knex('tags')
    const menuWithTags = menu.map((item) => {
      const dishTags = menuTags.filter((tag) => tag.menu_id === item.id)
      const menuTag = dishTags.map((tag) => tag.name).join(', ')

      return { ...item, tags: menuTag }
    })

    return res.json(menuWithTags)
  }

  async show(req, res) {
    const { id } = req.params

    const product = await knex('menus').where({ id }).first()

    const productTags = await knex('tags')
      .where({ menu_id: id })
      .orderBy('name')

    const tag = productTags.map((tag) => tag.name)

    return res.json({ ...product, tag })
  }

  async delete(req, res) {
    const { menu_id } = req.params

    await knex('menus').where({ id: menu_id }).delete()

    return res.json()
  }
}

module.exports = MenusController
