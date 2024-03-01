require('express-async-errors')
require('dotenv/config')
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const AppError = require('./utils/AppError')
const database = require('./database/sqlite')
const uploadConfig = require('./configs/upload')

const app = express()

app.use(cookieParser())
app.use(
  cors({
    origin: ['https://foodexplorer1000.netlify.app/'],
    credentials: true,
  }),
)

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://foodexplorer1000.netlify.app/',
  )
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(express.json())
app.use(routes)
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))
database()

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  console.error(error)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

const PORT = 3333
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`)
})
