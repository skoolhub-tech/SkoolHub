import React from 'react';
import EmailTemplateView from './EmailTemplateView';
import { useUserData } from '../data-providers/UserDataProvider';
import PropTypes from 'prop-types';

function EmailModal({
  setMessage, setSubject, email, setEmailModal, subject, body, setSelectedTemplate, currentClass,
}) {
  const { userData } = useUserData();
  // update Subject and line of email, send email on submit
  return (
    <div className="emailModal">
      {userData.role === 2 && (
        <EmailTemplateView
          setSelectedTemplate={setSelectedTemplate}
          currentClass={currentClass}
          setSubject={setSubject}
          setBody={setMessage}
        />
      )}
      <form onSubmit={email} className="emailModalForm">
        <label htmlFor="subject">
          Subject
          <input type="text" value={subject} id="subject" name="subject" onChange={(e) => { setSubject(e.target.value); }} required />
        </label>
        <label htmlFor="message">
          Message
          <textarea id="message" value={body} name="message" onChange={(e) => { setMessage(e.target.value); }} required />
        </label>
        <button type="button" onClick={() => setEmailModal(false)}>Close</button>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

EmailModal.propTypes = {
  setMessage: PropTypes.func.isRequired,
  setSubject: PropTypes.func.isRequired,
  email: PropTypes.func.isRequired,
  setEmailModal: PropTypes.func.isRequired,
};

export default EmailModal;
