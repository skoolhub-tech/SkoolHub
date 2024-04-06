// function to send email peer to peer

import axios from 'axios';

// import the keys from .env?
// update enpoint into server? leave as is?

async function sendEmail(formData) {
  const keys = {
    serviceid: 'service_3kyf5ip',
    publickey: 'lANtIwYBJdwYhxvdz',
    templateKey: 'template_nlg4cus',
  };
  const data = {
    service_id: keys.serviceid,
    template_id: keys.templateKey,
    user_id: keys.publickey,
    template_params: {
      subject: formData.subject,
      message: formData.message,
      from_name: formData.sender,
      from_email: formData.senderEmail,
      to_email: formData.receiverEmail,
    },
  };
  try {
    await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
    return 'Email Sent!';
  } catch (error) {
    return error.message;
  }
}
/*
can make .env contain the keys and url for the email service
app.post('/send-email', (req, res) => {
  axios.post('https://api.emailjs.com/api/v1.0/email/send', req.body)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send
    }
*/

export default sendEmail;
