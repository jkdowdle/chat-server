const TEST_USER = {
  id: 'xyzz',
  token: 'abcd',
  name: 'TEST'
}

let usersTable = []

export const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return 'Hello world!'
    },
    currentUser(_, args, { getSession }) {
      const { user: session } = getSession()

      if (session && session.id) {
        const user = usersTable
          .find((u) => u.id === session.id)

        return user
      }

      return null
    }
  },

  Mutation: {
    signin(_, args, { getSession }) {
      const session = getSession()
      const user = usersTable.find((user) => user.email === args.email && user.password === args.password)

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
    signup(_, args, { getSession }) {
      const session = getSession()
      const exists = usersTable.find((user) => user.email === args.email)

      if(exists) {
        throw new Error('Email address already exists')
      }

      const user = { id: String(Math.random()), ...args }

      usersTable = [
        ...usersTable,
        user
      ]

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