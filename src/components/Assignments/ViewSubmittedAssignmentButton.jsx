/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

function ViewSubmittedAssignmentButton(
  {
    assignmentId,
    viewSubmissionModalOpen,
    setViewSubmissionModalOpen,
    setAssignmentId,
  },
) {
  const handleClick = () => {
    setAssignmentId(assignmentId);
    setViewSubmissionModalOpen(!viewSubmissionModalOpen);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      View Submission
    </button>
  );
}

export default ViewSubmittedAssignmentButton;

ViewSubmittedAssignmentButton.propTypes = {
  assignmentId: PropTypes.number.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
  setViewSubmissionModalOpen: PropTypes.func.isRequired,
  viewSubmissionModalOpen: PropTypes.bool.isRequired,
};
