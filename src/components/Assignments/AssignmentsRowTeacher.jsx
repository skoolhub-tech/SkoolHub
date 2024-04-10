/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import EditAssignmentModal from './EditAssignmentModal';
import formatDate from '../../utils/formatDate_Month_D_Y';

function AssignmentsRowTeacher({
  assignment,
  setViewAssignmentSubmissions,
}) {
  const [editSubmissionModalIsOpen, setEditSubmissionModalIsOpen] = useState(false);

  function handleViewSubmissionsClick() {
    setViewAssignmentSubmissions(assignment);
  }

  return (
    <>
      <tr>
        <td>{assignment.name}</td>
        <td>{formatDate(assignment.due_date)}</td>
        <td className="edit_assignment_button">
          <button type="button" onClick={() => setEditSubmissionModalIsOpen(true)}><FaEdit /></button>
        </td>
        <td className="view_submissions_button">
          <button type="button" onClick={handleViewSubmissionsClick}><FaMagnifyingGlass size={15} /></button>
        </td>
      </tr>
      {editSubmissionModalIsOpen && (
      <EditAssignmentModal
        assignment={assignment}
        setEditSubmissionModalIsOpen={setEditSubmissionModalIsOpen}
      />
      )}
    </>
  );
}

AssignmentsRowTeacher.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    due_date: PropTypes.string,
  }).isRequired,
  setViewAssignmentSubmissions: PropTypes.func.isRequired,
};

export default AssignmentsRowTeacher;
