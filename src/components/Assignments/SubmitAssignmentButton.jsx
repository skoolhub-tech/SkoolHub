/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckSquare } from 'react-icons/fa';
import SubmitAssignmentModal from './SubmitAssignmentModal';

function SubmitAssignmentButton({
  studentEmail,
  assignmentId,
  getClassesAndAssignments,
  submitAssignmentModalIsOpen,
  setSubmitAssignmentModalIsOpen,
  assignmentToSubmit,
  setAssignmentToSubmit,
}) {
  function handleSubmitAssignmentButtonClick() {
    setSubmitAssignmentModalIsOpen(true);
    setAssignmentToSubmit({ id: assignmentId });
  }

  return (
    <div>
      <button type="button" className="submitAssignmentButtonButton" onClick={handleSubmitAssignmentButtonClick}><FaCheckSquare size={15} /></button>
      {submitAssignmentModalIsOpen && assignmentToSubmit?.id === assignmentId && (
      <SubmitAssignmentModal
        setSubmitAssignmentModalIsOpen={setSubmitAssignmentModalIsOpen}
        studentEmail={studentEmail}
        assignmentId={assignmentId}
        getClassesAndAssignments={getClassesAndAssignments}
      />
      )}
    </div>
  );
}

export default SubmitAssignmentButton;

SubmitAssignmentButton.propTypes = {
  studentEmail: PropTypes.string.isRequired,
  assignmentId: PropTypes.number.isRequired,
  getClassesAndAssignments: PropTypes.func.isRequired,
  submitAssignmentModalIsOpen: PropTypes.bool.isRequired,
  setSubmitAssignmentModalIsOpen: PropTypes.func.isRequired,
  assignmentToSubmit: PropTypes.shape({
    id: PropTypes.number,
  }),
  setAssignmentToSubmit: PropTypes.func.isRequired,
};

SubmitAssignmentButton.defaultProps = {
  assignmentToSubmit: {},
};
