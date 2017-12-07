
export const createServer = ({
  bodyParser,
  express,
  graphql,
  graphiql,
  PORT,
  schema,
}) => () => {
  const app = express()
  
  app.use('/graphql', bodyParser.json(), graphql(async (request, response) => {
  
    // const context = await contextFunction(request.headers, process.env)
    // const rootValue = await rootFunction(request.headers, process.env)

    return {
      schema: schema,
      // rootValue,
      // context,
      // tracing: true
    }
  }))
  
  app.use('/graphiql', graphiql({ endpointURL: '/graphql' }))
  
  app.listen(PORT, () => {
    console.clear()
    console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`)
  })
}


export default createServer

  // const contextFunction = Schema.context ||
  //   function(headers, secrets) {
  //     return Object.assign(
  //       {
  //         headers: headers
  //       },
  //       secrets
  //     )
  //   }