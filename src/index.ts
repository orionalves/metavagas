import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { Database } from '@/database/Database'
import { routes } from '@/routes/routes'

Database.initialize()

const app = express()

app.use(express.json())
app.use(routes)

app.listen(process.env.API_PORT, () => console.log('Server running at ' + process.env.API_PORT))
