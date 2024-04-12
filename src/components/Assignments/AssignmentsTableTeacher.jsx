/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AssignmentsRowTeacher from './AssignmentsRowTeacher';
import EditAssignmentModal from './EditAssignmentModal';
import CreateAssignmentModal from './CreateAssignmentModal';

function AssignmentsTableTeacher({
  data,
  selectedClass,
  setAssignmentId,
  setViewAssignmentSubmissions,
  getClassesAndAssignments,
  viewAssignmentSubmissions,
  role,
  setNotify,
  setMessage,
  setColor,
  setIcon,
}) {
  const [editSubmissionModalIsOpen, setEditSubmissionModalIsOpen] = useState(false);
  const [assignmentToView, setAssignmentToEdit] = useState(null);
  const [createAssignmentModalOpen, setCreateAssignmentModalOpen] = useState(false);

  return (
    <div>
      {selectedClass && !viewAssignmentSubmissions && role === 2 && (
      <button type="button" className="create_assignment_button" onClick={() => setCreateAssignmentModalOpen(true)}>
        Create Assignment
      </button>
      )}
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
            .assignments
            .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
            .map((assignment) => (
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
        getClassesAndAssignments={getClassesAndAssignments}
        setNotify={setNotify}
        setMessage={setMessage}
        setColor={setColor}
        setIcon={setIcon}
      />
      )}
      {createAssignmentModalOpen && (
      <CreateAssignmentModal
        classObj={data.find((classObj) => classObj.name === selectedClass)}
        closeModal={() => setCreateAssignmentModalOpen(false)}
        getClassesAndAssignments={getClassesAndAssignments}
        setNotify={setNotify}
        setMessage={setMessage}
        setColor={setColor}
        setIcon={setIcon}
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
  getClassesAndAssignments: PropTypes.func.isRequired,
  viewAssignmentSubmissions: PropTypes.object,
  role: PropTypes.number.isRequired,
  setNotify: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  setIcon: PropTypes.func.isRequired,
};

AssignmentsTableTeacher.defaultProps = {
  viewAssignmentSubmissions: null,
};
