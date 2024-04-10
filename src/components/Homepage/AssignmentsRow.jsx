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

  let completedIndicator;
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
    assignment_name: PropTypes.string,
    is_completed: PropTypes.bool,
  }).isRequired,
  dueDate: PropTypes.string,
};

AssignmentsRow.defaultProps = {
  dueDate: '',
};

export default AssignmentsRow;
