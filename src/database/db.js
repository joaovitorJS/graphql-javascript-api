import mongoose from 'mongoose'

function dbStart() {

  const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

  mongoose.set('strictQuery', false)

  mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin `, {
    useNewUrlParser: true,
  })

  mongoose.connection.on('error', () => console.error('connection error:'))
  mongoose.connection.once('open', () => console.log('Mongodb is running'))
}

export default dbStart
