require('dotenv').config();
const axios = require('axios');

module.exports = async (req, res) => {
  const data = {
    service_id: process.env.EMAIL_SERVICE_ID,
    template_id: process.env.AUTO_TEMPLATE_KEY,
    user_id: process.env.EMAIL_PUBLIC_KEY,
    accessToken: process.env.EMAIL_PRIVATE_KEY,
    template_params: {
      class_name: req.body.class_name,
      grade_threshold: req.body.grade_threshold,
      from_email: req.body.from_email,
      to_name: req.body.to_name,
      to_email: req.body.to_email,
      message: req.body.message,
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
