// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')

const app = express()

const PORT = 3333

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`)
})
