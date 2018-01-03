export const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return 'Hello world!'
    },
    currentUser(_, args, { user }) {
      return user
    }
  },

  Mutation: {
    async signin(_, args, { getSession, userController: { signin } }) {
      const session = getSession()
      const user = await signin(args)

      if(!user) {
        throw new Error('User does not exist or inccorect password')
      }
      
      return new Promise((resolve, reject) => {
        session.regenerate((error) => {
          getSession().user = { id: user.id } 
          resolve(user)
        })
      })
    },
    async signup(_, args, { getSession, userController: { signup } }) {
      const session = getSession()
      const user = await signup(args)

      return new Promise((resolve, reject) => {
        session.regenerate((error) => {
          getSession().user = { id: user.id } 
          resolve(user)
        })
      })
    },
    signout(_, args, { getSession }) {
      return new Promise(resolve => getSession().destroy(() => resolve(true)))
    }
  }
}