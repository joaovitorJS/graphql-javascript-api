import { mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'node:path'

const pathResolvers = path.join(__dirname, 'modules', '**', '*.resolvers.js')
const resolverFiles = loadFilesSync(pathResolvers)

const resolvers = mergeResolvers(resolverFiles)

export { resolvers }