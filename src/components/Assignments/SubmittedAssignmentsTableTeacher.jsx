import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SubmittedAssignmentsRow from './SubmittedAssignmentsRow';
import GradeSubmissionModal from './GradeSubmissionModal';
import fomratDate from '../../utils/formatDate_Month_D_Y';

function SubmittedAssignmentsTabelTeacher({
  assignment,
  setStudentId,
  setViewSubmissionModalOpen,
  setAssignmentId,
}) {
  const [submissions, setSubmissions] = useState([]);
  const [gradeSubmissionModalOpen, setGradeSubmissionModalOpen] = useState(false);
  const [submissionToGrade, setSubmissionToGrade] = useState(null);

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
            <th>View Submission</th>
            <th>Grade Submission</th>
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
              setGradeSubmissionModalOpen={setGradeSubmissionModalOpen}
              setSubmissionToGrade={setSubmissionToGrade}
            />
          ))}
        </tbody>
      </table>
      {gradeSubmissionModalOpen && (
      <GradeSubmissionModal
        submission={submissionToGrade}
        setGradeSubmissionModalOpen={setGradeSubmissionModalOpen}
      />
      )}
    </div>
  );
}

export default SubmittedAssignmentsTabelTeacher;

SubmittedAssignmentsTabelTeacher.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    due_date: PropTypes.string,
  }).isRequired,
  setStudentId: PropTypes.func.isRequired,
  setViewSubmissionModalOpen: PropTypes.func.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
};
