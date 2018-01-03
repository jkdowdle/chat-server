const createGetCurrentUser = ({ connection }) => ({ sessionId }) => {
  return !sessionId ? null : connection('user')
    .where('id', sessionId)
    .then(([ user ]) => user)
}

const createSignin = ({ connection }) => ({ email, password }) => {
  return connection('user')
    .where('email', email)
    .where('password', password)
    .then(([ user ]) => user)
}

const createSignup = ({ connection, uuid }) => ({ email, password }) => {
  const args = { email, password }

  return connection('user')
    .where('email', email)
    .then(response => {
      const [ exists ] = response

      if (exists) {
        return new Error('Email address already exists')
      }

      return connection('user')
        .insert({ id: uuid(), email, password, online: true })
        .returning(['id', 'email', 'online', 'created_at'])
        .then(([ user ]) => user)
    })
    .catch((e) => console.log('e', e))
}

const createGetUserById = ({ connection }) => (userId) => {
  return connection('user')
    .where('id', userId)
    .then(([ user ]) => user)
}

export const createUserController = ({ connection, uuid }) => ({
  getCurrentUser: createGetCurrentUser({ connection }),
  signin: createSignin({ connection }),
  signup: createSignup({ connection, uuid }),
  getUserById: createGetUserById({ connection })
  // signout: createSignout({ connection }),
})

export default createUserController