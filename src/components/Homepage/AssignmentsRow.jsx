/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { useUserData } from '../data-providers/UserDataProvider';

function AssignmentsRow({ assignment, dueDate }) {
  const { userData } = useUserData();
  const { name, completed } = assignment;
  const completedString = completed ? '✓' : 'X';

  return (
    <tr>
      <td>{name}</td>
      <td>{dueDate}</td>
      {userData.role === 3 ? <td>{completedString}</td> : null}
    </tr>
  );
}

AssignmentsRow.propTypes = {
  assignment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired, // Fix the prop type
  }).isRequired,
  dueDate: PropTypes.string.isRequired,
};

export default AssignmentsRow;
