import axios from 'axios';

async function autoEmail(inputs) {
  const data = {
    class_name: inputs.class,
    grade_threshold: inputs.gradeThreshold,
    from_email: inputs.teacherEmail,
    to_name: inputs.studentName,
    to_email: inputs.studentEmail,
    message: inputs.message,
  };
  try {
    await axios.post('/skoolhub/sendautoemail', data);
    return 'Auto Email Sent!';
  } catch (error) {
    return error.message;
  }
}

export default autoEmail;
