let channelsTable = [{ id: 'abcd' }]
let messagesTable = [
  { id: 'dbvc', text: 'Cool channel!', createdBy: 'grcd', channelId: 'abcd' }
]

export const resolvers = {
  Query: {
    mars: () => 'pretty neat',

    channels: () => {
      console.log('hip hip hurray')
      return channelsTable.map(channel => ({
        ...channel,
        feed: messagesTable.filter(({ channelId }) => channel.id === channelId)
      }))
    }
  }
}
