import User from '../../../models/User'
import { USER_ADDED } from './channels'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

function mockLongLastingOperation(user) {
  setTimeout(() => {
    pubsub.publish(USER_ADDED, {
      userAdded: user,
    })
  }, 1000)
}

export default {
  User: {
    fullName: (user) => `${user.firstName} ${user.lastName}`
  },

  Query: {
    users: async () => await User.find({}),
    user: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    createUser: async (_, { data }) => {
      const user = await User.create(data)

      mockLongLastingOperation(user)

      return user
    },
    updateUser: async (_, { id, data }) => {
      const user = await User.findOneAndUpdate(id, data, { new: true }) // new -> retorna o usuário depois de atualizar
      return user
    },
    deleteUser: async (_, { id }) => {
      const deleted = await User.findOneAndDelete(id)
      return !!deleted
    }
  },

  Subscription: {
    userAdded: {
      subscribe: () => {
        return pubsub.asyncIterator([USER_ADDED])
      }
    }
  }
}