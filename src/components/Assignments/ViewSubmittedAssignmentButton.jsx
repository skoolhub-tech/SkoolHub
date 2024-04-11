/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { FaMagnifyingGlass } from 'react-icons/fa6';

function ViewSubmittedAssignmentButton(
  {
    assignmentId,
    viewSubmissionModalOpen,
    setViewSubmissionModalOpen,
    setAssignmentId,
    setSubmitAssignmentModalIsOpen,
  },
) {
  const handleClick = () => {
    setAssignmentId(assignmentId);
    setViewSubmissionModalOpen(!viewSubmissionModalOpen);
    setSubmitAssignmentModalIsOpen(false);
  };

  return (
    <button
      className="assignment-icon-button"
      type="button"
      onClick={handleClick}
    >
      <FaMagnifyingGlass size={15} />
    </button>
  );
}

export default ViewSubmittedAssignmentButton;

ViewSubmittedAssignmentButton.propTypes = {
  assignmentId: PropTypes.number.isRequired,
  viewSubmissionModalOpen: PropTypes.bool.isRequired,
  setViewSubmissionModalOpen: PropTypes.func.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
  setSubmitAssignmentModalIsOpen: PropTypes.func.isRequired,
};
