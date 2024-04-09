import React, { useState } from 'react';

function GradeSummaryEmailTemplate({ setSubject, setBody, currentClass, setSelectedTemplate, setTemplateView }) {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setSubject(templateData.subject);
    setBody(templateData.body);
    setSelectedTemplate('Grade Summary Template Chosen');
  };
  const templateData = {
    subject: `grade summary for${currentClass.name}!`,
    body: `grade summary.`,
  };

  return (
    <div className="gradeSummaryEmailTemplate, emailTemplateCard">
      <p>Grade Summary Email Template</p>
      <button type="button" onClick={handleCheckboxChange}>Select</button>
    </div>
  );
}

export default GradeSummaryEmailTemplate;
