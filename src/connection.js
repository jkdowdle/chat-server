import knex from 'knex'

export default knex({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite'
  },
  useNullAsDefault: true
})

// export default knex({
//   client: 'pg',
//   // version: '7.2',
//   connection: 'postgres://hzfbtlaf:7M5ULHjjeXTSq-O9Q01CVQHCYlASf64P@baasu.db.elephantsql.com:5432/hzfbtlaf',
//   // connection: {
//   //   host : 'postgres://hzfbtlaf:7M5ULHjjeXTSq-O9Q01CVQHCYlASf64P@baasu.db.elephantsql.com:5432/hzfbtlaf',
//   //   user : 'hzfbtlaf',
//   //   password : '7M5ULHjjeXTSq-O9Q01CVQHCYlASf64P',
//   //   database : 'chat'
//   // }
// });