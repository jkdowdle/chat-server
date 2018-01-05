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

    console.log('hit here')

    const session = request.session 

    const user = await (session && session.user && controllers.userController.getCurrentUser({ sessionId: request.session.user.id })) || {}

    const context = {
      user,
      ...controllers
    }

    let sessionReset = false

    return {
      schema: schema,
      context,
      fieldResolver: async (param, two, three, four) => {
        return new Promise((resolve, reject) => {
          if (!sessionReset && (four.path.prev.key === 'signin' || four.path.prev.key === 'signup')) {
            sessionReset = true
            request.session.regenerate((error) => {
              request.session.user = {id: param.id}
              request.session.user.test = 'foo bar'
              error && console.log('err', error)
              resolve(param[four.fieldName])
            })
            
          } else if (!sessionReset && four.path.prev.key === 'signout') {
            sessionReset = true
            request.session.destroy((error) => {
              error && console.log('err', error)
              resolve(param[four.fieldName])
            })

          
          } else {
            resolve(param[four.fieldName])
          }
        })
      }
    }
  }))
  
  app.use('/graphiql', graphiql({ endpointURL: '/graphql' }))
  
  app.listen(PORT, () => {
    console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`)
  })
}

// http://localhost:5000/graphiql?query=query%20CurrentUser%20%7B%0A%20%20currentUser%20%7B%0A%20%20%20%20id%0A%20%20%20%20email%0A%20%20%20%20name%0A%20%20%7D%0A%7D%0A%0Amutation%20Signin(%24signinInput%3A%20UserInput)%20%7B%0A%20%20signin(input%3A%20%24signinInput)%20%7B%0A%20%20%20%20id%0A%20%20%20%20email%0A%20%20%20%20name%0A%20%20%7D%0A%7D%0A%0Amutation%20Signup(%24signupInput%3A%20UserInput)%20%7B%0A%20%20signup(input%3A%20%24signupInput)%20%7B%0A%20%20%20%20id%0A%20%20%20%20email%0A%20%20%20%20name%0A%20%20%7D%0A%7D%0A%0Amutation%20Signout%20%7B%0A%20%20signout%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%7D%0A%7D%0A%0Aquery%20Channels%20%7B%0A%20%20channels%20%7B%0A%20%20%20%20name%0A%20%20%20%20id%0A%20%20%20%20feed%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20from%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20email%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Amutation%20CreateChannel(%24createChannelInput%3A%20ChannelInput)%20%7B%0A%20%20createChannel(input%3A%20%24createChannelInput)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%7D%0A%7D%0A%0Amutation%20AddMessage(%24addMessageInput%3A%20MessageInput)%20%7B%0A%20%20addMessage(input%3A%20%24addMessageInput)%20%7B%0A%20%20%20%20id%0A%20%20%20%20text%0A%20%20%7D%0A%7D%0A&operationName=Channels&variables=%7B%0A%20%20%22signinInput%22%3A%20%7B%0A%20%20%20%20%22email%22%3A%20%22elliot%40gmail.com%22%2C%0A%20%20%20%20%22password%22%3A%20%22password%22%0A%20%20%7D%2C%0A%20%20%22signupInput%22%3A%20%7B%0A%20%20%20%20%22email%22%3A%20%22elliot%40gmail.com%22%2C%0A%20%20%20%20%22password%22%3A%20%22password%22%2C%0A%20%20%20%20%22firstName%22%3A%20%22Elliot%22%2C%0A%20%20%20%20%22lastName%22%3A%20%22D%22%0A%20%20%7D%2C%0A%20%20%22addMessageInput%22%3A%20%7B%0A%20%20%20%20%22channelId%22%3A%20%2284f4ee12-3d1f-bf83-6f56-64b8fad4c156%22%2C%0A%20%20%20%20%22text%22%3A%20%22Let%27s%20go%20to%20the%20movies%22%2C%0A%20%20%20%20%22userId%22%3A%20%2279a92440-5635-68f1-aab6-7c1b9a166397%22%0A%20%20%7D%2C%0A%20%20%22createChannelInput%22%3A%20%7B%0A%20%20%20%20%22name%22%3A%20%22NewChannel%22%0A%20%20%7D%0A%7D

export default createApp