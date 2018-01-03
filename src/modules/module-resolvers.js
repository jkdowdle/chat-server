import merge from 'lodash.merge'

import * as user from './user/resolvers'
import * as chat from './chat/resolvers'

export const resolvers = merge(user, chat)
