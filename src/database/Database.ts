import { commonError } from '@/utils/commonError'
import { status } from '@/utils/status'
import mongoose, { connect } from 'mongoose'

class Database {
  static async initialize() {
    if (!process.env.DATABASE_URL) {
      return console.error(
        commonError(
          'Database initialization failed: Database URL not found.',
          status.internalServerError
        )
      )
    }
    try {
      mongoose.connection.once('open', () => {
        console.log('Database connection is open:')
      })
      return await connect(process.env.DATABASE_URL)
    } catch {
      return commonError('Database conection failed', status.internalServerError)
    }
  }
}

export { Database }
