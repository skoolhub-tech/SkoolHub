require('dotenv').config();
const axios = require('axios');
module.exports = async (req, res) => {

  const data = {
    service_id: process.env.EMAIL_SERVICE_ID,
    template_id: process.env.PEER_TEMPLATE_KEY,
    user_id: process.env.EMAIL_PUBLIC_KEY,
    accessToken: process.env.EMAIL_PRIVATE_KEY,
    template_params: {
      subject: req.body.subject,
      message: req.body.message,
      from_name: req.body.from_name,
      from_email: req.body.from_email,
      to_email: req.body.to_email,
    },
  };
  axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
    .then(() => {
      res.send('Email Sent!').status(200);
    })
    .catch((error) => {
      res.send(error.message).status(error.status);
    });
};