/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { motion } from 'framer-motion';
import { VscError } from 'react-icons/vsc';
import { BsFillFileEarmarkCheckFill } from 'react-icons/bs';
import { useUserData } from '../data-providers/UserDataProvider';
import compareAvgGradeToThreshold from '../../utils/compareAvgGradeToThreshold';
import './gradeSubmissionModal.css';

function GradeSubmissionModal({
  setGradeSubmissionModalOpen,
  submission,
  getSubmissions,
  studentId,
  classObjForEmail,
  setNotify,
  setMessage,
  setColor,
  setIcon,
}) {
  const [grade, setGrade] = useState(submission.grade);
  const [score, setScore] = useState(submission.score);
  const [totalPoints, setTotalPoints] = useState(submission.total_points);
  const [feedback, setFeedback] = useState(submission.feedback);
  const { userData: { role } } = useUserData();

  function handleSubmitGrade(event) {
    event.preventDefault();
    axios.patch('/skoolhub/assignments/submissions', {
      submission: {
        grade,
        score,
        totalPoints,
        feedback,
        submissionId: submission.submission_id,
      },
      role,
    })
      .then(() => {
        setNotify();
        setMessage('Assignment updated.');
        setColor(0);
        setIcon(<BsFillFileEarmarkCheckFill />);
        getSubmissions();
        compareAvgGradeToThreshold(classObjForEmail.id, studentId);
      })
      .catch(() => {
        setNotify();
        setMessage('Error grading assignment.');
        setColor(1);
        setIcon(<VscError />);
      })
      .finally(() => {
        setGradeSubmissionModalOpen(false);
      });
  }

  function handleOverlayKeypress(event) {
    if (event.key === 'Escape') {
      setGradeSubmissionModalOpen(false);
    }
  }

  return (
    <div
      className="grade_submission_modal_overlay"
      onClick={() => setGradeSubmissionModalOpen(false)}
      onKeyPress={handleOverlayKeypress}
      type="button"
    >
      <motion.div
        className="assignments_motion_div"
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        transition={{ ease: 'easeInOut', duration: 0.7 }}
      >
        <div className="grade_submission_modal">
          <h2>Grade Submission</h2>
          <form onSubmit={handleSubmitGrade}>
            <label htmlFor="score">
              % Score:
              {' '}
              <input type="number" id="score" name="score" value={score} min="0" max="100" onChange={(e) => setScore(e.target.value)} />
            </label>
            <br />
            <label htmlFor="total_points">
              Total Points:
              {' '}
              <input type="number" id="total_points" name="total_points" value={totalPoints} onChange={(e) => setTotalPoints(e.target.value)} />
            </label>
            <br />
            <label htmlFor="grade">
              Grade:
              {' '}
              <input type="text" id="grade" name="grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
            </label>
            <br />
            <label htmlFor="feedback">
              Feedback:
              {' '}
              <br />
              <textarea id="feedback" name="feedback" value={feedback || ''} onChange={(e) => setFeedback(e.target.value)} />
            </label>
            <br />
            <br />
            <button className="grade-sub-modal-bttn" type="submit">Submit Grade</button>
            <br />
            <br />
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default GradeSubmissionModal;

GradeSubmissionModal.propTypes = {
  setGradeSubmissionModalOpen: PropTypes.func.isRequired,
  submission: PropTypes.shape({
    grade: PropTypes.string,
    score: PropTypes.number,
    total_points: PropTypes.number,
    feedback: PropTypes.string,
    submission_id: PropTypes.number,
  }).isRequired,
  getSubmissions: PropTypes.func.isRequired,
  studentId: PropTypes.number.isRequired,
  classObjForEmail: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  setNotify: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  setIcon: PropTypes.func.isRequired,
};
