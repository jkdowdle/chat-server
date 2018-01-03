export const resolvers = {
  Query: {
    mars: () => 'pretty neat',

    channels: (_, args, { chatController: { getChannels }}) => {
      return getChannels()
    }
  },
  Mutation: {
    createChannel: (_, args, { chatController: { createChannel }}) => {
      return createChannel(args)
    },
    addMessage: (_, args, { chatController: { addMessage }}) => {
      return addMessage(args)
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
