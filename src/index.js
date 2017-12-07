import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import bodyParser from 'body-parser'

import { schema } from './schema'
import createServer from './create-server'

const PORT = 5050

const app = createServer({
  bodyParser,
  express,
  graphql: graphqlExpress,
  graphiql: graphiqlExpress,
  PORT,
  schema,
})

app()