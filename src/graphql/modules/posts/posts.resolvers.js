import User from '../../../models/User'
import Post from '../../../models/Post'

export default {
  Post: {
    author: async (post) => await User.findById(post.author)
  },

  Query: {
    posts: async () => await Post.find(),
    post: async (_, { id }) => await Post.findById(id),
  },
  Mutation: {
    createPost: async (_, { data }) => {
      const post = await Post.create(data)
      return post
    },
    updatePost: async (_, { id, data }) => {
      const post = await Post.findOneAndUpdate(id, data, { new: true }) // new -> retorna o usuário depois de atualizar
      return post
    },
    deletePost: async (_, { id }) => {
      const deleted = await Post.findOneAndDelete(id)
      return !!deleted
    }
  },
}