import connection from './connection'

export const createApp = ({
  bodyParser,
  express,
  graphql,
  graphiql,
  PORT,
  schema,
  middleware,
  controllers
}) => () => {
  const app = express()

  middleware
    .map((middleware) => app.use(middleware))
  
  app.use('/graphql', bodyParser.json(), graphql( async (request, response) => {

    const user = await request.session.user && controllers.userController.getCurrentUser({ sessionId: request.session.user.id})

    const context = {
      user,
      getSession: () => request.session,
      ...controllers
    }

    return {
      schema: schema,
      // rootValue,
      context,
      // tracing: true
    }
  }))
  
  app.use('/graphiql', graphiql({ endpointURL: '/graphql' }))
  
  app.listen(PORT, () => {
    // console.clear()
    console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`)
  })
}


export default createApp