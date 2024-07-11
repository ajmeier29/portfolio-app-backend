require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const CHECKBOX_SITE_SECRET = process.env.CHECKBOX_SITE_SECRET
const INVISIBLE_SITE_SECRET = process.env.INVISIBLE_SITE_SECRET
const JUSTIN_RESEND_ID = process.env.JUSTIN_RESEND_ID
const JUSTIN_RESEND_AUD_ID = process.env.JUSTIN_RESEND_AUD_ID

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

app.post('/subscribe/justin', async (request, response) => {
  try {
    const resend = new Resend(JUSTIN_RESEND_ID);

    resend.contacts.create({
      email: request.body.email_address,
      firstName: '',
      lastName: '',
      unsubscribed: false,
      audienceId: JUSTIN_RESEND_AUD_ID,
    });

  } catch (error) {
    //console.error('Error adding subscriber:', error);
    if (!response.headersSent) {
      // Only set status and send error if headers haven't been sent yet
      response.status(error.response?.status || 500).send({
        status: error.response?.status || 500,
        reason: error.message,
        body: error.response?.data || 'Unknown error',
      });
    }
  }
});

const port = (process.env.PORT || 5001);
app.listen(port, () => {
  console.log(`reCaptcha Server listening at ${port}`)
})