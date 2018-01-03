import merge from 'lodash.merge'
import { makeExecutableSchema } from 'graphql-tools'

import rootSchema from './root-schema.graphql'
import { resolvers as userRes } from '../modules/user/resolvers'
import { resolvers as chatRes } from '../modules/chat/resolvers'
// import { resolvers } from '../modules'
import { moduleSchemas, 
  // resolvers 
} from '../modules'

const typeDefs = [rootSchema, ...moduleSchemas]

const resolvers = merge(userRes, chatRes)

// console.log('moduleSchemas', moduleSchemas)

export const schema = makeExecutableSchema({ typeDefs, resolvers })
