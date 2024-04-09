import React, { useState } from 'react';
import WelcomeEmailTemplate from './EmailTemplates/WelcomeEmailTemplate';
import GradeSummaryEmailTemplate from './EmailTemplates/GradeSummaryEmailTemplate';
import ScheduleMeetingEmailTemplate from './EmailTemplates/ScheduleMeetingEmailTemplate';
import WriteYourOwnEmail from './EmailTemplates/WriteYourOwnEmailTemplate';

function EmailTemplateView({ setSubject, setBody, currentClass, setSelectedTemplate, setTemplateView }) {
  return (
    <div className="emailTemplatesView">
      <WelcomeEmailTemplate
        setSubject={setSubject}
        setBody={setBody}
        currentClass={currentClass}
        setSelectedTemplate={setSelectedTemplate}
        setTemplateView={setTemplateView}
      />
      <ScheduleMeetingEmailTemplate
        setSubject={setSubject}
        setBody={setBody}
        currentClass={currentClass}
        setSelectedTemplate={setSelectedTemplate}
        setTemplateView={setTemplateView}
      />
      <GradeSummaryEmailTemplate
        setSubject={setSubject}
        setBody={setBody}
        currentClass={currentClass}
        setSelectedTemplate={setSelectedTemplate}
        setTemplateView={setTemplateView}
      />
      <WriteYourOwnEmail
        setSubject={setSubject}
        setBody={setBody}
        currentClass={currentClass}
        setSelectedTemplate={setSelectedTemplate}
        setTemplateView={setTemplateView}
      />
    </div>
  );
}
//<GradeSummaryEmailTemplate />
//<MeetingEmailTemplate />

export default EmailTemplateView;
