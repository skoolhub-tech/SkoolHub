import React from 'react';
import PropTypes from 'prop-types';
import EmailTemplateView from './EmailTemplateView';
import { useUserData } from '../data-providers/UserDataProvider';
import { motion } from 'framer-motion';

function EmailModal({
  setMessage, setSubject, email, setEmailModal, subject, body, setSelectedTemplate, currentClass,
}) {
  const { userData } = useUserData();
  // update Subject and line of email, send email on submit
  return (
    <div className="emailModal">
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        exit={{ scale: 0.5 }}
      >
        <div className="emailModalContent">
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
            <div className="emailModalBtns">
              <button type="button" className="closeEmailModalBtn" onClick={() => setEmailModal(false)}>Close</button>
              <button type="submit">Send Email</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

EmailModal.propTypes = {
  setMessage: PropTypes.func.isRequired,
  setSubject: PropTypes.func.isRequired,
  email: PropTypes.func.isRequired,
  setEmailModal: PropTypes.func.isRequired,
  subject: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  setSelectedTemplate: PropTypes.func.isRequired,
  currentClass: PropTypes.shape({}).isRequired,
};

export default EmailModal;
