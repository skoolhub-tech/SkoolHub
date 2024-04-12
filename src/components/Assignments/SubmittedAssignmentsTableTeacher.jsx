/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { VscError } from 'react-icons/vsc';
import PropTypes from 'prop-types';
import SubmittedAssignmentsRow from './SubmittedAssignmentsRow';
import GradeSubmissionModal from './GradeSubmissionModal';
import formatDate from '../../utils/formatDate_Month_D_Y';

function SubmittedAssignmentsTabelTeacher({
  assignment,
  setStudentId,
  setViewSubmissionModalOpen,
  setAssignmentId,
  studentId,
  classObjForEmail,
  setNotify,
  setMessage,
  setColor,
  setIcon,
}) {
  const [submissions, setSubmissions] = useState([]);
  const [gradeSubmissionModalOpen, setGradeSubmissionModalOpen] = useState(false);
  const [submissionToGrade, setSubmissionToGrade] = useState(null);

  const getSubmissions = useCallback(async () => {
    try {
      const response = await axios.get(`/skoolhub/assignments/submissions/?id=${assignment.id}`);
      setSubmissions(response.data);
    } catch (error) {
      setNotify();
      setMessage('Error retrieving assignment submissions.');
      setColor(1);
      setIcon(<VscError />);
    }
  }, [assignment.id]);

  useEffect(() => {
    getSubmissions();
  }, []);

  return (
    <div>
      <h2>{assignment.name}</h2>
      <h3 className="view-submission-h3">
        Due Date:
        {' '}
        {formatDate(assignment.due_date)}
      </h3>
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
        getSubmissions={getSubmissions}
        studentId={studentId}
        classObjForEmail={classObjForEmail}
        setNotify={setNotify}
        setMessage={setMessage}
        setColor={setColor}
        setIcon={setIcon}
      />
      )}
    </div>
  );
}

export default SubmittedAssignmentsTabelTeacher;

SubmittedAssignmentsTabelTeacher.propTypes = {
  assignment: PropTypes.object.isRequired,
  setStudentId: PropTypes.func.isRequired,
  setViewSubmissionModalOpen: PropTypes.func.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
  studentId: PropTypes.number,
  classObjForEmail: PropTypes.object.isRequired,
  setNotify: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  setIcon: PropTypes.func.isRequired,
};

SubmittedAssignmentsTabelTeacher.defaultProps = {
  studentId: null,
};
