import React, { useState } from 'react';
import { useUserData } from '../../data-providers/UserDataProvider';

// later can add on click it takes teacher template from db
function WelcomeEmailTemplate({ setSubject, setBody, currentClass, setSelectedTemplate, setTemplateView }) {
  const { userData } = useUserData();
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setSubject(templateData.subject);
    setBody(templateData.body);
    setSelectedTemplate('Welcome Template Chosen');
  };
  const templateData = {
    subject: `Welcome to ${currentClass.name}!`,
    body: `I hope this email finds you well. I wanted to take a moment to extend a warm welcome to you as a new member of our class. If you have any questions, concerns, or ideas you'd like to share, please don't hesitate to reach out to me. Once again, welcome to the class!

    Best regards,
    ${userData.name}`,
  };

  return (
    <div className="welcomeEmailTemplate, emailTemplateCard">
      <p>Welcome Email Template</p>
      <button type="button" onClick={handleCheckboxChange}>Select</button>
    </div>
  );
}

export default WelcomeEmailTemplate;
