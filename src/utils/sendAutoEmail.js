import axios from 'axios';

// an input object with the following properties needed
async function sendAutoEmail(inputs) {
  const data = {
    class_name: inputs.class,
    grade_threshold: inputs.gradeThreshold,
    from_email: inputs.teacherEmail,
    to_name: inputs.studentName,
    to_email: inputs.studentEmail,
    message: inputs.message,
  };
  return('auto email sent to', data.to_email);
  /*
  try {
    await axios.post('/skoolhub/sendautoemail', data);
    return 'Auto Email Sent!';
  } catch (error) {
    return error.message;
  }*/
}

export default sendAutoEmail;
