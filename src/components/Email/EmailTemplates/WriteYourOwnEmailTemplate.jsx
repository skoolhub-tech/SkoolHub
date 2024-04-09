import React, { useState } from 'react';

function WriteYourOwnEmail({ setSubject, setBody, currentClass, setSelectedTemplate, setTemplateView }) {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setSubject('');
    setBody('');
    setSelectedTemplate('No Template Chosen');

  };

  return (
    <div className="writeYourOwnEmail, emailTemplateCard">
      <p>Write Your Own Email</p>
      <button type="button" onClick={handleCheckboxChange}>Select</button>
    </div>
  );
}

export default WriteYourOwnEmail;
