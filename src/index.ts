import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { Database } from '@/database/Database'
import { routes } from '@/routes/routes'
import { commonError } from '@/utils/commonError'
import { status } from '@/utils/status'

const port = process.env.API_PORT

Database.initialize()

const app = express()

app.use(express.json())
app.use(routes)

port
  ? app.listen(port, () => console.log('Server running at ' + port))
  : console.error(commonError("Port isn't configured.", status.internalServerError))
