const one = {
  schema: { // GraphqlSchema
    _queryType: Query,
    _mutationType: Mutation,
    _subscriptionType: Subscription,
    _directives: [[Object], [Object], [Object]],
    astNode: null,
    _typeMap: {
      Query: Query,
      Int: Int,
      User: User,
      String: String,
      Channel: Channel,
      ID: ID,
      Message: Message,
      Mutation: Mutation,
      UserInput: UserInput,
      ChannelInput: ChannelInput,
      MessageInput: MessageInput,
      Subscription: Subscription,
      __Schema: __Schema,
      __Type: __Type,
      __TypeKind: __TypeKind,
      Boolean: Boolean,
      __Field: __Field,
      __InputValue: __InputValue,
      __EnumValue: __EnumValue,
      __Directive: __Directive,
      __DirectiveLocation: __DirectiveLocation
    },
    _implementations: {}
  },
  query:
    'query CurrentUser {\n  currentUser {\n    id\n    email\n    name\n  }\n}\n\nmutation Signin($signinInput: UserInput) {\n  signin(input: $signinInput) {\n    id\n    email\n    name\n  }\n}\n\nmutation Signup($signupInput: UserInput) {\n  signup(input: $signupInput) {\n    id\n    email\n    name\n  }\n}\n\nmutation Signout {\n  signout {\n    id\n    name\n  }\n}\n\nquery Channels {\n  channels {\n    name\n    id\n    feed {\n      id\n      text\n      from {\n        id\n        email\n        name\n      }\n    }\n  }\n}\n\nmutation CreateChannel($createChannelInput: ChannelInput) {\n  createChannel(input: $createChannelInput) {\n    id\n    name\n  }\n}\n\nmutation AddMessage($addMessageInput: MessageInput) {\n  addMessage(input: $addMessageInput) {\n    id\n    text\n  }\n}\n',
  variables: {
    signinInput: { email: 'elliot@gmail.com', password: 'password' },
    signupInput: {
      email: 'elliot@gmail.com',
      password: 'password',
      firstName: 'Elliot',
      lastName: 'D'
    },
    addMessageInput: {
      channelId: '84f4ee12-3d1f-bf83-6f56-64b8fad4c156',
      text: "Let's go to the movies",
      userId: '79a92440-5635-68f1-aab6-7c1b9a166397'
    },
    createChannelInput: { name: 'NewChannel' }
  },
  context: {
    user: {
      id: '79a92440-5635-68f1-aab6-7c1b9a166397',
      email: 'elliot@gmail.com',
      password: '$2a$10$BD0FSj0qLmd7prt1Xf0.2ebTbMi2AlG/5bfwhVdyG5ZA6D9302LUS',
      online: true,
      created_at: '2018-01-04T17:29:44.608Z',
      updated_at: '2018-01-04T17:29:44.608Z',
      firstName: 'Elliot',
      lastName: 'D'
    },
    getSession: [(Function: getSession)],
    userController: {
      getCurrentUser: [Function],
      signin: [Function],
      signup: [Function],
      getUserById: [Function]
    },
    chatController: {
      getChannels: [Function],
      createChannel: [Function],
      addMessage: [Function],
      getChannelFeed: [Function]
    }
  },
  rootValue: undefined,
  operationName: 'CreateChannel',
  logFunction: undefined,
  validationRules: undefined,
   formatError: [Function: formatError],
  formatResponse: undefined,
  fieldResolver: undefined,
  debug: undefined,
  tracing: undefined,
  cacheControl: undefined
}
