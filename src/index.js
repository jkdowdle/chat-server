import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import session from 'express-session'
import bodyParser from 'body-parser'
import fileStore from 'session-file-store'
import bcrypt from 'bcrypt'
import cors from 'cors'

import { schema } from './api'
import createApp from './create-app'

import connection from './connection'
import uuid from './uuid'
import createUserController from './modules/user/create-user-controller'
import createChatController from './modules/chat/create-chat-controller'

// import './db-setup'

const PORT = 5000

const FileStore = new fileStore(session)

const appSession = session({
  name: 'token',
  secret: 'Apples are watching...',
  resave: true,
  saveUninitialized: true,
  store: new FileStore()
})

const appCors = cors({ credentials: true, origin: 'http://localhost:3000' })

const middleware = [
  appSession,
  appCors
]

const controllers = {
  userController: createUserController({ connection, uuid, bcrypt }),
  chatController: createChatController({ connection, uuid })
}

const app = createApp({
  bodyParser,
  express,
  graphql: graphqlExpress,
  graphiql: graphiqlExpress,
  PORT,
  schema,
  middleware,
  controllers
})

app()