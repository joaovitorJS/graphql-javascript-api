import startServer from './start-server'
import { typeDefs } from './graphql/type-defs'
import { resolvers } from './graphql/resolvers'

startServer({ typeDefs, resolvers })