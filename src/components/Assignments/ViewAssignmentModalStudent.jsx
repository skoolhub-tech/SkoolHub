/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './viewAssignmentModalStudent.css';

function ViewAssignmentModalStudent({
  assignment,
  setAssignmentToView,
}) {
  function handleOverlayKeypress(event) {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      setAssignmentToView(null);
    }
  }

  function handleModalKeypress(event) {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      setAssignmentToView(null);
    }
  }

  function handleClickOnModal(event) {
    event.stopPropagation();
  }

  return (
    <div
      className="view_assignment_modal_overlay"
      onClick={() => setAssignmentToView(null)}
      onKeyPress={handleOverlayKeypress}
      type="button"
    >
      <motion.div
        className="assignments_motion_div"
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        transition={{ ease: 'easeInOut', duration: 0.7 }}
      >
        <div
          className="view_assignment_modal"
          onKeyPress={handleModalKeypress}
          onClick={handleClickOnModal}
        >
          <h1>{assignment.name}</h1>
          <p>
            Assigned By:
            {' '}
            {assignment.teacher_name}
          </p>
          <p>
            Instructions:
            {' '}
            {assignment.instructions}
          </p>
          <p>
            Grade:
            {' '}
            {assignment.grade || 'Not Graded'}
          </p>
          <p>
            Score:
            {' '}
            {assignment.score || 'Not Scored'}
          </p>
          <p>
            Total Points:
            {' '}
            {assignment.total_points || 'Not Scored'}
          </p>
          {assignment?.feedback && (
            <p>
              Feedback:
              {' '}
              {assignment.feedback}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ViewAssignmentModalStudent;

PropTypes.ViewAssignmentModalStudent = {
  assignment: PropTypes.shape({
    name: PropTypes.string,
    teacher_name: PropTypes.string,
    instructions: PropTypes.string,
    grade: PropTypes.string,
    score: PropTypes.string,
    total_points: PropTypes.string,
  }).isRequired,
  setAssignmentToView: PropTypes.func.isRequired,
};
