import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SubmittedAssignmentsRow from './SubmittedAssignmentsRow';
import fomratDate from '../../utils/formatDate_Month_D_Y';

function SubmittedAssignmentsTabelTeacher({
  assignment,
  setStudentId,
  setViewSubmissionModalOpen,
  setAssignmentId,
}) {
  const [submissions, setSubmissions] = useState([]);

  const getSubmissions = async () => {
    try {
      const response = await axios.get(`/skoolhub/assignments/submissions/?id=${assignment.id}`);
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  return (
    <div>
      <h1>Submitted Assignments</h1>
      <h2>{assignment.name}</h2>
      <h2>
        Due Date:
        {fomratDate(assignment.due_date)}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Submitted On</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <SubmittedAssignmentsRow
              key={submission.submission_id}
              submission={submission}
              setStudentId={setStudentId}
              setViewSubmissionModalOpen={setViewSubmissionModalOpen}
              setAssignmentId={setAssignmentId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubmittedAssignmentsTabelTeacher;

SubmittedAssignmentsTabelTeacher.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  setStudentId: PropTypes.func.isRequired,
  setViewSubmissionModalOpen: PropTypes.func.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
};
