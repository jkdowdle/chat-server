export const resolvers = {
  Query: {
    currentUser(_, args, { user }) {
      return user
    }
  },

  Mutation: {
    async signin(_, { input }, { userController: { signin } }) {
      const user = await signin(input)

      return user
    },
    async signup(_, { input }, { userController: { signup } }) {
      console.log('input', input)
      const user = await signup(input)

      return user
    },
    signout(_, args) {
      return true 
      // return new Promise(resolve => getSession().destroy(() => resolve(true)))
    }
  },

  User: {
    name: ({ firstName, lastName }) => `${firstName} ${lastName}`
  },

  AuthUser: {
    name: ({ firstName, lastName }) => `${firstName} ${lastName}`
  }
}