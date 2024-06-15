require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
const port = 8000

const SITE_SECRET = process.env.SITE_SECRET

app.use(express.json())

app.post('/verify', async (request, response) => {
  const { captchaValue } = request.body
  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}`,
  )
  response.send(data)
  console.log(`Sent data for captchaValue: ${captchaValue}`)
})

app.listen(port, () => {
  console.log(`reCaptcha Server listening at ${port}`)
})