import express, { json } from 'express'
import cors from 'cors'

const app = express()

import userRoutes from './routes/userRoutes'

const dbconfig = require('./config/dbConfig')
app.use(cors())
app.use(json())
app.use('/api/users', userRoutes)



const PORT = process.env.PORT || 8081




app.listen(PORT, () => {
    console.log("server running at port:" + PORT)
})