import React from 'react';

function WriteYourOwnEmail({
  setSubject,
  setBody,
  setSelectedTemplate,
}) {
  const handleCheckboxChange = () => {
    setSubject('');
    setBody('');
    setSelectedTemplate('No Template Chosen');
  };

  return (
    <div className="emailTemplateCard">
      <p>Write Your Own</p>
      <button type="button" onClick={handleCheckboxChange}>Select</button>
    </div>
  );
}

export default WriteYourOwnEmail;
