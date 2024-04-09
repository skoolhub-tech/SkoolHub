import React, { useState } from 'react';

// later can add on click it takes teacher template from db
function WelcomeEmailTemplate({ setSubject, setBody, currentClass, setSelectedTemplate, setTemplateView }) {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setSubject(templateData.subject);
    setBody(templateData.body);
    setSelectedTemplate('Welcome Template Chosen');
  };
  const templateData = {
    subject: `Welcome to ${currentClass.name}!`,
    body: `I hope this email finds you well. I wanted to take a moment to extend a warm welcome to you as a new member of our class. If you have any questions, concerns, or ideas you'd like to share, please don't hesitate to reach out to me. My door is always open, and I'm here to support you in any way I can.
    Once again, welcome to the class! Let's make this a fantastic semester together.`,
  };

  return (
    <div className="welcomeEmailTemplate, emailTemplateCard">
      <p>Welcome Email Template</p>
      <button type="button" onClick={handleCheckboxChange}>Select</button>
    </div>
  );
}

export default WelcomeEmailTemplate;
