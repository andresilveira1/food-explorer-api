exports.up = (knex) =>
  knex.schema.createTable('order_list', (table) => {
    table.increments('id')
    table.text('name')
    table.integer('quantity')
    table.integer('price')
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })

exports.down = (knex) => knex.schema.dropTable('order_list')
