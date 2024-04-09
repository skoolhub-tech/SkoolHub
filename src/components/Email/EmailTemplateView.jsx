import React from 'react';
import WelcomeEmailTemplate from './EmailTemplates/WelcomeEmailTemplate';
import GradeSummaryEmailTemplate from './EmailTemplates/GradeSummaryEmailTemplate';
import ScheduleMeetingEmailTemplate from './EmailTemplates/ScheduleMeetingEmailTemplate';
import WriteYourOwnEmail from './EmailTemplates/WriteYourOwnEmailTemplate';

function EmailTemplateView({ setSubject, setBody, currentClass, setSelectedTemplate, }) {
  return (
    <div className="emailTemplatesView">
      <h3>Choose a Template</h3>
      <div className="emailTemplatesContainer">
        <WelcomeEmailTemplate
          setSubject={setSubject}
          setBody={setBody}
          currentClass={currentClass}
          setSelectedTemplate={setSelectedTemplate}
        />
        <ScheduleMeetingEmailTemplate
          setSubject={setSubject}
          setBody={setBody}
          currentClass={currentClass}
          setSelectedTemplate={setSelectedTemplate}
        />
        <GradeSummaryEmailTemplate
          setSubject={setSubject}
          setBody={setBody}
          currentClass={currentClass}
          setSelectedTemplate={setSelectedTemplate}
        />
        <WriteYourOwnEmail
          setSubject={setSubject}
          setBody={setBody}
          setSelectedTemplate={setSelectedTemplate}
        />
      </div>
    </div>
  );
}

export default EmailTemplateView;
