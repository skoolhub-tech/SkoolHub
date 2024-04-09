import React from 'react';
import { useUserData } from '../../data-providers/UserDataProvider';

function ScheduleMeetingEmailTemplate({ setSubject, setBody, currentClass, setSelectedTemplate, }) {
  const { userData } = useUserData();

  const handleCheckboxChange = () => {
    setSubject(templateData.subject);
    setBody(templateData.body);
    setSelectedTemplate('Schedule Meeting Template Chosen');
  };

  const templateData = {
    subject: `Schedule Meeting for ${currentClass.name}`,
    body: `Dear [Recipient's Name],

    I hope this email finds you well. I would like to schedule a meeting to discuss [purpose of the meeting]. Below are the details:

    Date: [Date of the Meeting]
    Time: [Time of the Meeting]
    Location: [Location of the Meeting, if applicable]

    Please let me know if the proposed time works for you or if you have any scheduling conflicts. I'm flexible and can adjust the timing to accommodate your availability.

    Looking forward to our discussion.

    Best regards,
    ${userData.name}`,
  };

  return (
    <div className="emailTemplateCard">
      <p>Schedule Meeting Template</p>
      <button type="button" onClick={handleCheckboxChange}>Select</button>
    </div>
  );
}

export default ScheduleMeetingEmailTemplate;
