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
  },
) {
  const handleClick = () => {
    setAssignmentId(assignmentId);
    setViewSubmissionModalOpen(!viewSubmissionModalOpen);
  };

  return (
    <button
      className="assignment-icon-button"
      type="button"
      onClick={handleClick}
    >
      <FaMagnifyingGlass size={15}/>
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
