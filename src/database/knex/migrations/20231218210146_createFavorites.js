exports.up = (knex) =>
  knex.schema.createTable('favorites', (table) => {
    table.increments('id')
    table.text('name')
    table.text('image')
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table
      .integer('menu_id')
      .references('id')
      .inTable('menus')
      .onDelete('CASCADE')
    table.timestamp('created_at').default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('favorites')
