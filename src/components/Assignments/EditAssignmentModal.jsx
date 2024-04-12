/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { motion } from 'framer-motion';
import { VscError } from 'react-icons/vsc';
import { BsFillFileEarmarkCheckFill } from 'react-icons/bs';
import './editAssignmentModal.css';
import { useUserData } from '../data-providers/UserDataProvider';

function EditAssignmentModal({
  assignment,
  setEditSubmissionModalIsOpen,
  getClassesAndAssignments,
  setNotify,
  setMessage,
  setColor,
  setIcon,
}) {
  const [assignmentName, setAssignmentName] = useState(assignment.name);
  const [dueDate, setDueDate] = useState(assignment.due_date);
  const [instructions, setInstructions] = useState(assignment.instructions);
  const { userData: { role } } = useUserData();

  function handleSubmitEdit(event) {
    event.preventDefault();
    axios.put('skoolhub/assignments', {
      assignment: {
        name: assignmentName,
        dueDate,
        instructions,
        assignmentId: assignment.id,
      },
      role,
    })
      .then(() => {
        setNotify();
        setMessage('Assignment updated.');
        setColor(0);
        setIcon(<BsFillFileEarmarkCheckFill />);
        getClassesAndAssignments();
      })
      .catch(() => {
        setNotify();
        setMessage('Error updating assignment.');
        setColor(1);
        setIcon(<VscError />);
        getClassesAndAssignments();
      })
      .finally(() => {
        getClassesAndAssignments();
        setEditSubmissionModalIsOpen(false);
      });
  }

  function handleOverlayKeypress(event) {
    if (event.key === 'Escape') {
      setEditSubmissionModalIsOpen(false);
    }
  }

  function handleModalClick(event) {
    event.stopPropagation();
  }

  function handleModalKeypress(event) {
    if (event.key === 'Escape') {
      setEditSubmissionModalIsOpen(false);
    }
  }

  return (
    <div
      className="edit_assignment_modal_overlay"
      onClick={() => setEditSubmissionModalIsOpen(false)}
      onKeyPress={handleOverlayKeypress}
      type="button"
    >
      <motion.div
        className="assignments_motion_div"
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        exit={{ scale: 0.5 }}
      >
        <div
          className="edit_assignment_modal"
          onClick={handleModalClick}
          onKeyPress={handleModalKeypress}
        >
          <h2>
            Edit Assignment:
            {assignment.name}
          </h2>
          <form onSubmit={handleSubmitEdit}>
            <label className="edit-label" htmlFor="assignmentName">
              Assignment Name:
              <input
                type="text"
                id="assignmentName"
                value={assignmentName}
                onChange={(e) => setAssignmentName(e.target.value)}
              />
            </label>
            <label className="edit-label" htmlFor="dueDate">
              Due Date:
              <input
                type="date"
                id="dueDate"
                value={dueDate.slice(0, 10)}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
            <label className="edit-label" htmlFor="instructions">
              Instructions:
              <textarea
                id="instructions"
                value={instructions || ''}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </label>
            <button type="submit" className="view_submissions_button" onClick={() => {}}>Edit Assignment</button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default EditAssignmentModal;

EditAssignmentModal.propTypes = {
  assignment: PropTypes.shape({
    name: PropTypes.string,
    due_date: PropTypes.string,
    instructions: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  setEditSubmissionModalIsOpen: PropTypes.func.isRequired,
  getClassesAndAssignments: PropTypes.func.isRequired,
  setNotify: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  setIcon: PropTypes.func.isRequired,
};
