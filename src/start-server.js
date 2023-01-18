import http from 'node:http'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import express from 'express'

import dbStart from './database/db'

async function startServer({ typeDefs, resolvers }) {

  dbStart()

  const app = express()


  const httpServer = http.createServer(app);


  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql'
  })

  const wsServerCleanup = useServer({ schema }, wsServer)

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await wsServerCleanup.dispose()
            }
          }
        }
      }
    ],
  })

  await apolloServer.start()

  app.use('/graphql', express.json(), expressMiddleware(apolloServer))

  httpServer.listen(3000, () => {
    console.log('Query endpoint ready at http://localhost:3000/graphql')
    console.log('Subscription endpoint ready at ws://localhost:3000/graphql')
  })
}

export default startServer