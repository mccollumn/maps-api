const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { run, insertOne } = require('./db')
const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  await run()
  res.send('Goodbye World!')
})

app.post('/locationData', async (req, res) => {
  const dbRes = await insertOne(req.body, "locations") || {}
  console.log(req.body)
  console.log("DB Response:", dbRes)
  res.send({
    insertedCount: dbRes.insertedCount,
    result: dbRes.ops
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})