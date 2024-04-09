import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate_Month_D_Y';

function SubmittedAssignmentsTabelTeacher({ assignment }) {
  const [submissions, setSubmissions] = useState([]);

  const getSubmissions = async () => {
    try {
      const response = await axios.get(`http://${process.env.SERVER_IP}:${process.env.PORT}/skoolhub/assignments/submissions/?id=${assignment.id}`);
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
      <h1>View Submitted Assignments</h1>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Grade</th>
            <th>Submitted On</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.submission_id}>
              <td>{submission.student_name}</td>
              <td>{formatDate(submission.submitted_on)}</td>
              <td>{submission.grade}</td>
              <td>
                <button type="button">View Submission</button>
              </td>
            </tr>
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
    name: PropTypes.string,
    due_date: PropTypes.string,
  }).isRequired,
};
