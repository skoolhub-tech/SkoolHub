import React, { useState } from 'react';

function ScheduleMeetingEmailTemplate({ setSubject, setBody, currentClass, setSelectedTemplate, setTemplateView }) {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
      setSubject(templateData.subject);
      setBody(templateData.body);
      setSelectedTemplate('Schedule Meeting Template Chosen');
  };
  const templateData = {
    subject: `Welcome to ${currentClass.name}!`,
    body: `schedule`,
  };

  return (
    <div className="scheduleMeetingEmailTemplate, emailTemplateCard">
      <p>Schedule Meeting Email Template</p>
      <button type="button" onClick={handleCheckboxChange}>Select</button>
    </div>
  );
}

export default ScheduleMeetingEmailTemplate;
