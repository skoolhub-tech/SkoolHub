/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { motion } from 'framer-motion';
import { VscError } from 'react-icons/vsc';
import { BsFillFileEarmarkCheckFill } from 'react-icons/bs';
import { useUserData } from '../data-providers/UserDataProvider';
import './createAssignmentModal.css';

function CreateAssignmentModal({
  classObj,
  closeModal,
  getClassesAndAssignments,
  setNotify,
  setMessage,
  setColor,
  setIcon,
}) {
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [instructions, setInstructions] = useState('');
  const { userData: { id, role } } = useUserData();

  function handleAssignmentNameChange(event) {
    setAssignmentName(event.target.value);
  }

  function handleDueDateChange(event) {
    setDueDate(event.target.value);
  }

  function handleInstructionsChange(event) {
    setInstructions(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('/skoolhub/assignments', {
      assignment: {
        classId: classObj.id,
        name: assignmentName,
        dueDate: new Date(dueDate),
        instructions,
        teacherId: id,
      },
      role,
    })
      .then(() => {
        setNotify();
        setMessage('Assignment Created.');
        setColor(0);
        setIcon(<BsFillFileEarmarkCheckFill />);
        getClassesAndAssignments();
      })
      .catch(() => {
        setNotify();
        setMessage('Error creating assignment.');
        setColor(1);
        setIcon(<VscError />);
        getClassesAndAssignments();
      })
      .finally(() => {
        closeModal();
      });
  }

  function handleCloseModalKeypress(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  function handleClick(event) {
    event.stopPropagation();
  }

  function handleKeyPress(event) {
    event.stopPropagation();
  }

  return (
    <div
      className="create-assignment-modal-background"
      role="button"
      tabIndex={0}
      onClick={closeModal}
      onKeyPress={handleCloseModalKeypress}
    >
      <motion.div
        className="assignments_motion_div"
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        transition={{ ease: 'easeInOut', duration: 0.7 }}
      >
        <div className="create_assignment_modal" role="button" tabIndex={0} onClick={handleClick} onKeyPress={handleKeyPress}>
          <h1>Create Assignment</h1>
          <form className="create_assignment_form" onSubmit={handleSubmit}>
            <br />
            <br />
            <label className="create-assignment-label" htmlFor="assignmentName">Assignment Name:</label>
            <input
              type="text"
              id="assignmentName"
              placeholder="Enter Assignment Name"
              onChange={handleAssignmentNameChange}
            />
            <br />
            <label className="create-assignment-label" htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              placeholder="YYYY-MM-DD"
              onChange={handleDueDateChange}
            />
            <br />
            <label className="create-assignment-label" htmlFor="instructions">Instructions:</label>
            <textarea
              id="instructions"
              placeholder="Enter Assignment Instructions"
              onChange={handleInstructionsChange}
            />
            <br />
            <br />
            <button type="submit">Create Assignment</button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default CreateAssignmentModal;

CreateAssignmentModal.propTypes = {
  classObj: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  getClassesAndAssignments: PropTypes.func.isRequired,
  setNotify: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  setIcon: PropTypes.func.isRequired,
};
