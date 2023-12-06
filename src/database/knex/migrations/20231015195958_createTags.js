exports.up = (knex) =>
  knex.schema.createTable('tags', (table) => {
    table.increments('id')
    table.text('name').notNullable()
    table
      .integer('menu_id')
      .references('id')
      .inTable('menus')
      .onDelete('CASCADE')
    table.timestamp('created_at').default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('tags')
