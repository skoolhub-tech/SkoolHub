// function to send email peer to peer
import axios from 'axios';

async function sendEmail(formData) {
  const data = {
    subject: formData.subject,
    message: formData.message,
    from_name: formData.sender,
    from_email: formData.senderEmail,
    to_email: formData.receiverEmail,
  };
  try {
    await axios.post('/skoolhub/sendemail', data);
    return 'Email Sent!';
  } catch (error) {
    return error.message;
  }
}

export default sendEmail;
