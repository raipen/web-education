const express = require('express')
const router = require('./router')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
