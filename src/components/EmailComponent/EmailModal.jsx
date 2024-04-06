import React, { useState } from 'react';

function EmailModal(setFormData, formData, email, setEmailModal) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={email}>
      <button onClick={() => setEmailModal(false)}>Close</button>
      <label>
        Subject:
        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
      </label>
      <label>
        Message:
        <textarea name="message" value={formData.message} onChange={handleChange} required />
      </label>
      <button type="submit">Send Email</button>
    </form>
  );
}

export default EmailModal;
