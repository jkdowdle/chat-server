export const resolvers = {
  Query: {
    channels: (_, args, { chatController: { getChannels }}) => {
      return getChannels()
    },
    channel: (_, { input }, { chatController: { getChannel }}) => {
      return getChannel(input)
    }
  },
  Mutation: {
    createChannel: (_, { input }, { chatController: { createChannel }}) => {
      return createChannel(input)
    },
    addMessage: (_, { input }, { user, chatController: { addMessage }}) => {
      return addMessage({ ...input, userId: user.id })
    }
  },
  Channel: {
    feed: ({ id }, args, { chatController: { getChannelFeed }}) => {
      return getChannelFeed(id)
    },
  },
  Message: {
    from: ({ user_id }, args, { userController: { getUserById }}) => {
      // getUserById(user_id)
      //   .then(user => console.log('from res', user))
      return getUserById(user_id)
    }
  }
}
