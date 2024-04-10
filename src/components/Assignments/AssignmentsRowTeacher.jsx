/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import formatDate from '../../utils/formatDate_Month_D_Y';

function AssignmentsRowTeacher({
  assignment,
  setViewAssignmentSubmissions,
  setEditSubmissionModalIsOpen,
  setAssignmentToEdit,
  setAssignmentId,
}) {
  function handleViewSubmissionsClick() {
    setViewAssignmentSubmissions(assignment);
    setAssignmentId(assignment.id);
  }

  function handleEditAssignmentClick() {
    setAssignmentToEdit(assignment);
    setEditSubmissionModalIsOpen(true);
  }

  return (
    <tr>
      <td>{assignment.name}</td>
      <td>{formatDate(assignment.due_date)}</td>
      <td className="edit_assignment_button">
        <button type="button" onClick={handleEditAssignmentClick}><FaEdit /></button>
      </td>
      <td className="view_submissions_button">
        <button type="button" onClick={handleViewSubmissionsClick}><FaMagnifyingGlass size={15} /></button>
      </td>
    </tr>
  );
}

AssignmentsRowTeacher.propTypes = {
  assignment: PropTypes.object.isRequired,
  setViewAssignmentSubmissions: PropTypes.func.isRequired,
  setEditSubmissionModalIsOpen: PropTypes.func.isRequired,
  setAssignmentToEdit: PropTypes.func.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
};

export default AssignmentsRowTeacher;
