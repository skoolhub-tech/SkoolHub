/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import { useUserData } from '../data-providers/UserDataProvider';

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'MM/dd/yy');
};

function AssignmentsRow({ assignment, dueDate }) {
  const { userData } = useUserData();
  const { assignment_name, is_completed } = assignment;
  const completedString = is_completed ? '✓' : 'X';

  let completedIndicator;
  console.log(dueDate, ' ', new Date(dueDate));
  if (!is_completed && new Date(dueDate) < new Date()) {
    completedIndicator = (
      <p className="overdue-assignment">OVERDUE</p>
    );
  } else if (!is_completed) {
    completedIndicator = 'X';
  } else if (is_completed) {
    completedIndicator = '✓';
  }

  return (
    <tr>
      <td>{assignment_name}</td>
      <td>{formatDate(dueDate)}</td>
      {userData.role === 3 ? <td className="center-table">{completedIndicator}</td> : null}
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
