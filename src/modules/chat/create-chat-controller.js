const createGetChannels = ({ connection }) => () => {
  return connection('channel')
    .then((channels) => channels)
}

const createGetChannel = ({ connection }) => ({ id }) => {
  return connection('channel')
    .where('id', id)
    .then((res) => {
      console.log('res', res)
      return res[0]})
}

const createCreateChannel = ({ connection, uuid }) => (input) => {
  return connection('channel')
    .insert({ id: uuid(), ...input })
    .returning(['id', 'name', 'created_at'])
    .then(([ channel ]) => channel)
}

const createAddMessage = ({ connection, uuid }) => ({ userId, channelId, ...message }) => {
  return connection('message')
    .insert({ id: uuid(), user_id: userId, channel_id: channelId, ...message })
    .returning(['id', 'created_at', 'text', 'user_id', 'channel_id', ])
    .then(([ message ]) => message)
}

const createGetChannelFeed = ({ connection }) => (channelId) => {
  return connection('message')
    .where('channel_id', channelId)
    .then((feed) => {
      // console.log('feed', feed)
      return feed || []})
}

export const createChatController = ({ connection, uuid }) => ({
  getChannels: createGetChannels({ connection }),
  createChannel: createCreateChannel({ connection, uuid }),
  addMessage: createAddMessage({ connection, uuid }),
  getChannelFeed: createGetChannelFeed({ connection }),
  getChannel: createGetChannel({ connection })
})

export default createChatController