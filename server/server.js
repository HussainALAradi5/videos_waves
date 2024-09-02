const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 5000
const db = require('./config/db')
app.use(express.json())
app.use(cors())
const connect = db.connectDB()

app.listen(port, () => {
  connect
  console.log(`server start at http://localhost:${port}`)
})
