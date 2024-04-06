// function to send email to student for low grade
/*
data: JSON.stringify(data),
contentType: 'application/json'
*/
import axios from 'axios';

const inputs = {
  class: 'Math',
  studentName: 'michael',
  studentEmail: 'mmmcclan365@gmail.com',
  gradeThreshold: '70',
  teacherEmail: 'mmmcclan365@gmail.com',
  message: 'You are failing!',
};
// needs to take in inputs
async function autoEmail() {
  const keys = {
    serviceid: 'service_3kyf5ip',
    publickey: 'lANtIwYBJdwYhxvdz',
    templateKey: 'template_dbshsoq',
  };
  const data = {
    service_id: keys.serviceid,
    template_id: keys.templateKey,
    user_id: keys.publickey,
    template_params: {
      class_name: inputs.class,
      grade_threshold: inputs.gradeThreshold,
      from_email: inputs.teacherEmail,
      to_name: inputs.studentName,
      to_email: inputs.studentEmail,
      message: inputs.message,
    },
  };
  try {
    await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
    return 'AutoEmail Sent!';
  } catch (error) {
    return error.message;
  }
}
/*
can make .env contain the keys and url for the email service
app.post('/autoemail', (req, res) => {
  axios.post('https://api.emailjs.com/api/v1.0/email/send', req.body)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send
    }
*/

export default autoEmail;
