import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'node:path'

const pathTypes = path.join(__dirname, 'modules', '**', '*.gql')
const typesArray = loadFilesSync(pathTypes)

const typeDefs = mergeTypeDefs(typesArray)

export { typeDefs }