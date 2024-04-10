/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
        <td>
          <button type="button" className="edit_assignment_button" onClick={() => setEditSubmissionModalIsOpen(true)}>Edit Assignment</button>
        </td>
        <td>
          <button type="button" className="view_submissions_button" onClick={handleViewSubmissionsClick}>View Submissions</button>
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
