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
    addMessage: (_, { input }, { chatController: { addMessage }}) => {
      return addMessage(input)
    }
  },
  Channel: {
    feed: ({ id }, args, { chatController: { getChannelFeed }}) => {
      return getChannelFeed(id)
    },
  },
  Message: {
    from: ({ user_id }, args, { userController: { getUserById }}) => {
      return getUserById(user_id)
    }
  }
}
