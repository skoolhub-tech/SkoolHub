/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';

import { useUserData } from '../data-providers/UserDataProvider';
import AssignmentsRow from './AssignmentsRow';

function AssignmentsTable({
  assignments,
  classes,
  selectedClass,
  filter,
}) {
  const { userData } = useUserData();

  return (
    <div className="homepage-assignments-table">
      <select
        className="homepage-class-select"
        value={selectedClass}
        onChange={(e) => filter(e)}
      >
        <option value="All Classes">All Classes</option>
        {classes.length > 0 && classes.map((classObj) => (
          <option key={classObj.class_id} value={classObj.class_id}>
            {classObj.class_name}
          </option>
        ))}
      </select>
      <table className="HP-assignments-table">
        <thead>
          <tr>
            <th className="left-table">Assignment</th>
            <th className="left-table">Due</th>
            {userData.role === 3 ? <th className="right-table">Completed</th> : null}
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 && assignments.map((assignment) => (
            <AssignmentsRow
              key={assignment.assignment_id}
              dueDate={assignment.due_date}
              assignment={assignment}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentsTable;
