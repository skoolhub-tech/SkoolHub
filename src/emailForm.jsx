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

  const email = async (e) => {
    e.preventDefault();
    const result = await sendEmail(formData);
    console.log(result);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={email}>
      <label>
        Subject:
        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
      </label>
      <label>
        Message:
        <input type="text" name="message" value={formData.message} onChange={handleChange} required />
      </label>
      <label>
        Sender:
        <input type="text" name="sender" value={formData.sender} onChange={handleChange} required />
      </label>
      <label>
        Sender Email:
        <input type="email" name="senderEmail" value={formData.senderEmail} onChange={handleChange} required />
      </label>
      <label>
        Receiver Email:
        <input type="email" name="receiverEmail" value={formData.receiverEmail} onChange={handleChange} required />
      </label>
      <button type="submit">Send Email</button>
    </form>
  );
}

export default EmailForm;
