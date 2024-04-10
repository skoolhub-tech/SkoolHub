/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AssignmentsRowTeacher from './AssignmentsRowTeacher';
import EditAssignmentModal from './EditAssignmentModal';

function AssignmentsTableTeacher({
  data,
  selectedClass,
  setAssignmentId,
  setViewAssignmentSubmissions,
}) {
  const [editSubmissionModalIsOpen, setEditSubmissionModalIsOpen] = useState(false);
  const [assignmentToView, setAssignmentToEdit] = useState(null);

  return (
    <div>
      <table className="assignments_table_teacher">
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Due Date</th>
            <th>Edit Assignment</th>
            <th>View Submissions</th>
          </tr>
        </thead>
        <tbody>
          {data
            .find((classObj) => classObj.name === selectedClass)
            .assignments.map((assignment) => (
              <AssignmentsRowTeacher
                key={assignment.id}
                assignment={assignment}
                setAssignmentId={setAssignmentId}
                setViewAssignmentSubmissions={setViewAssignmentSubmissions}
                setEditSubmissionModalIsOpen={setEditSubmissionModalIsOpen}
                setAssignmentToEdit={setAssignmentToEdit}
              />
            ))}
        </tbody>
      </table>
      {editSubmissionModalIsOpen && (
      <EditAssignmentModal
        assignment={assignmentToView}
        setEditSubmissionModalIsOpen={setEditSubmissionModalIsOpen}
      />
      )}
    </div>
  );
}

export default AssignmentsTableTeacher;

AssignmentsTableTeacher.propTypes = {
  data: PropTypes.array.isRequired,
  selectedClass: PropTypes.string.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
  setViewAssignmentSubmissions: PropTypes.func.isRequired,
};
