require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const CHECKBOX_SITE_SECRET = process.env.CHECKBOX_SITE_SECRET
const INVISIBLE_SITE_SECRET = process.env.INVISIBLE_SITE_SECRET

app.use(cors())
app.use(express.json())

app.post('/verify/checkbox', async (request, response) => {
  const { captchaValue } = request.body
  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${CHECKBOX_SITE_SECRET}&response=${captchaValue}`,
  )
  response.send(data)
})

app.post('/verify/invisible', async (request, response) => {
  const { captchaValue } = request.body
  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${INVISIBLE_SITE_SECRET}&response=${captchaValue}`,
  )
  response.send(data)
})

const port = (process.env.PORT || 5001);
app.listen(port, () => {
  console.log(`reCaptcha Server listening at ${port}`)
})