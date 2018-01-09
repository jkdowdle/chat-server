const saltRounds = 10

const createGetCurrentUser = ({ connection }) => ({ sessionId }) => {
  return !sessionId
    ? null
    : connection('user')
        .where('id', sessionId)
        .then(([ { first_name: firstName, last_name: lastName, ...user } ]) => {
          console.log('getCurUser', { ...user, firstName, lastName })
          return ({ ...user, firstName, lastName })})
        .catch((e) => console.log('e', e))
}

const createSignin = ({ connection, bcrypt }) => ({ email, password }) => {
  return connection('user')
    .where('email', email)
    // .where('password', password)
    .then(([ user ]) => {

      return bcrypt
        .compare(password, user.password)
        .then((res) => {
          if (res) {
            return user
          }

          throw new Error('User does not exist or inccorect password')
        })


    })
    .then(({ first_name: firstName, last_name: lastName, ...user }) => ({ ...user, firstName, lastName }))
}

const createSignup = ({ connection, uuid, bcrypt }) => ({
  email,
  password,
  firstName,
  lastName,
}) => {

  return connection('user')
    .where('email', email)
    .then(async (response) => {
      const [exists] = response

      if (exists) {
        return new Error('Email address already exists')
      }

      const hash = await bcrypt.hash(password, saltRounds)
        .then((hash) => hash)
        .catch((error) => console.log('err hashing', error))

      return connection('user')
        .insert({
          id: uuid(),
          email,
          password: hash,
          first_name: firstName,
          last_name: lastName,
          online: true
        })
        .returning([
          'id',
          'email',
          'online',
          'first_name',
          'last_name',
          'created_at'
        ])
        .then(([ { first_name: firstName, last_name: lastName, ...user } ]) => ({ ...user, firstName, lastName }))
    })
    .catch(e => console.log('e', e))
}

const createGetUserById = ({ connection }) => userId => {
  return connection('user')
    .where('id', userId)
    .then(([ { first_name: firstName, last_name: lastName, ...user } ]) => ({ ...user, firstName, lastName }))
}

export const createUserController = ({ connection, uuid, bcrypt }) => ({
  getCurrentUser: createGetCurrentUser({ connection }),
  signin: createSignin({ connection, bcrypt }),
  signup: createSignup({ connection, uuid, bcrypt }),
  getUserById: createGetUserById({ connection })
  // signout: createSignout({ connection }),
})

export default createUserController
