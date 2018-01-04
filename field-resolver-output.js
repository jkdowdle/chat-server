// fieldResolver

// RootValue ?
const RootValue = {
  id: '79a92440-5635-68f1-aab6-7c1b9a166397',
  email: 'elliot@gmail.com',
  password: '$2a$10$BD0FSj0qLmd7prt1Xf0.2ebTbMi2AlG/5bfwhVdyG5ZA6D9302LUS',
  online: true,
  created_at: '2018-01-04T17:29:44.608Z',
  updated_at: '2018-01-04T17:29:44.608Z',
  firstName: 'Elliot',
  lastName: 'D'
}

const two = {}

// Context
const Context = {
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
}

const four = {
  fieldName: 'id',
  fieldNodes: [
    {
      kind: 'Field',
      alias: null,
      name: [Object],
      arguments: [],
      directives: [],
      selectionSet: null,
      loc: [Object]
    }
  ],
  returnType: String,
  parentType: User,
  path: { prev: { prev: undefined, key: 'signin' }, key: 'id' }, // Resolver name?
  schema: {
    //GraphQLSchema
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
  fragments: {},
  rootValue: undefined,
  operation: {
    kind: 'OperationDefinition',
    operation: 'mutation',
    name: { kind: 'Name', value: 'Signin' /* Name of query */,  loc: [Object] },
    variableDefinitions: [[Object]],
    directives: [],
    selectionSet: { kind: 'SelectionSet', selections: [Array], loc: [Object] },
    loc: { start: 69, end: 175 }
  },
  variableValues: {
    signinInput: { email: 'elliot@gmail.com', password: 'password' }
  }
}
