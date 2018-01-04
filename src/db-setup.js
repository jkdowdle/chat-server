import connection from './connection'

function uuid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

const User = connection.schema
  .createTableIfNotExists('user', (table) => {
    table.uuid('id').notNullable().primary()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.string('first_name')
    table.string('last_name')
    table.boolean('online').notNullable()
    table.timestamps(true, true)
  })

const Chat = connection.schema
  .createTableIfNotExists('channel', (table) => {
    table.uuid('id').notNullable().primary()
    table.string('name')
    table.timestamps(true, true)
  })
  .createTableIfNotExists('channel_participant', (table) => {
    // table.uuid('id').notNullable().primary()
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
    // table.timestamps(true, true)
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

const userId = uuid()
const channelId = uuid()

Promise
  .all([
    connection.schema
      .dropTableIfExists('message')
      .dropTableIfExists('channel_participant')
      .dropTableIfExists('channel')
      .dropTableIfExists('user')
      .dropTableIfExists('test')
  ])
  .then(() => 
    Promise.all([
      User,
      Chat
    ])
  )
  .then(() =>
    Promise.all([
      connection('user')
        .insert({ id: userId, email: 'ead@gmail.com', first_name: 'E', last_name: 'D', password: '123456', online: true }),
      connection('channel')
        .insert({ id: channelId, name: 'TestChannel' }),
      connection('channel_participant')
        .insert({ user_id: userId, channel_id: channelId }),
      connection('message')
        .insert({ id: uuid(), text: 'First message!', user_id: userId, channel_id: channelId })
    ])
  )
  .catch(e => console.log('e', e))
