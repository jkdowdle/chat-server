const Chat = connection.schema
  .createTableIfNotExists('channel', (table) => {
    table.uuid('id').notNullable().primary()
    table.timestamps(true, true)
  })
  .createTableIfNotExists('channel_participant', (table) => {
    table
      .uuid('user_id')
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
    table
      .uuid('channel_id')
      .unsigned()
      .references('id')
      .inTable('channel')
      .onDelete('CASCADE')
  })
  .createTableIfNotExists('message', (table) => {
    table.uuid('id').notNullable().primary()
    table.string('text')
    table
      .uuid('user_id')
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
    table
      .uuid('channel_id')
      .unsigned()
      .references('id')
      .inTable('channel')
      .onDelete('CASCADE')
    table.timestamps(true, true)
  })