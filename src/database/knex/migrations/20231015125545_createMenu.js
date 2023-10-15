exports.up = (knex) =>
  knex.schema.createTable('menu', (table) => {
    table.increments('id')
    table.text('name').notNullable()
    table.text('description').notNullable()
    table.text('avatar').notNullable()
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('menu')
