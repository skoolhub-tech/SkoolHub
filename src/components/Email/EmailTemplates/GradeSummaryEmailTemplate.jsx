import React, { useState } from 'react';
import { useUserData } from '../../data-providers/UserDataProvider';

function GradeSummaryEmailTemplate({ setSubject, setBody, currentClass, setSelectedTemplate, setTemplateView }) {
  const { userData } = useUserData();
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setSubject(templateData.subject);
    setBody(templateData.body);
    setSelectedTemplate('Grade Summary Template Chosen');
  };
  const templateData = {
    subject: `Grade Summary for ${currentClass.name}`,
    body: `Dear [Student's Name],

    I hope this email finds you well. Here's a summary of your grades for the ${currentClass.name} class:

    - Assignment 1: [Grade]
    - Assignment 2: [Grade]
    - Midterm Exam: [Grade]
    - Final Project: [Grade]

    If you have any questions or concerns about your grades, please feel free to reach out to me.

    Best regards,
    ${userData.name}`,
  };

  return (
    <div className="gradeSummaryEmailTemplate, emailTemplateCard">
      <p>Grade Summary Email Template</p>
      <button type="button" onClick={handleCheckboxChange}>Select</button>
    </div>
  );
}

export default GradeSummaryEmailTemplate;
