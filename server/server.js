const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const PORT = process.env.PORT || process.env.API_PORT

const authRoute = require('./routes/auth_route')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoute)

const server = http.createServer(app)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB connection Successful!")
    server.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}...`)
    })
}).catch((err) => {
    console.log("Error while connecting to DB!!!")
    console.error(err)
})
