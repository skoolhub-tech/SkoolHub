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
    <div className="emailTemplateCard" onClick={handleCheckboxChange}>
      <p>Write Your Own</p>
    </div>
  );
}

export default WriteYourOwnEmail;
