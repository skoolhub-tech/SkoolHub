import React, { useState } from 'react';
import sendEmail from './sendEmail';

// will replace form fields with easy selection of student and class
// add character limits?
// replace the senderEmail and sender to be passed down name and email
function EmailForm() {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    sender: '',
    senderEmail: '',
    receiverEmail: '',
  });
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const email = async (e) => {
    e.preventDefault();
    const response = await sendEmail(formData);
    if (response === 'Email Sent!') {
      setEmailSent(true);
      setErrorMessage('');
    } else {
      setEmailSent(false);
      setErrorMessage(response);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={email}>
      <label>
        Your Name:
        <br />
        <input type="text" name="sender" value={formData.sender} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Your Email:
        <br />
        <input type="email" name="senderEmail" value={formData.senderEmail} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Recipient Email:
        <br />
        <input type="email" name="receiverEmail" value={formData.receiverEmail} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Subject:
        <br />
        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Message:
        <br />
        <textarea name="message" value={formData.message} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Send Email</button>
      {emailSent && <p>Email Sent!</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default EmailForm;
