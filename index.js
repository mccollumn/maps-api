const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Goodbye World!')
})

app.post('/locationData', (req, res) => {
  console.log(req.body)
  res.send('Success')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})