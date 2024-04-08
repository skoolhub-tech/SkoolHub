import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserData } from '../data-providers/UserDataProvider';
import ClassesDropDownMenu from './ClassesDropDownMenu';
import AssignmentsRowStudent from './AssignmentsRowStudent';

function AssignmentsPage() {
  const { userData: { email, role } } = useUserData();
  const [data, setData] = React.useState(null);
  const [selectedClass, setSelectedClass] = React.useState(null);

  async function getClassesAndAssignmentsForStudent() {
    try {
      const response = await axios.get(`http://${process.env.SERVER_IP}:${process.env.PORT}/skoolhub/classesAndAssignments/students?email=${'joshua.king@gmail.com'}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getClassesAndAssignmentsForStudent();
  }, [email]);

  return data ? (
    <div>
      <h1>Assignments</h1>
      <ClassesDropDownMenu
        classes={data}
        setSelectedClass={setSelectedClass}
      />
      <div>
        {selectedClass ? (
          <div>
            <h2>{selectedClass}</h2>
            <table>
              <tr>
                <th>Assignment</th>
                <th>Due Date</th>
                <th>Submitted On</th>
              </tr>
              {data
                .find((classObj) => classObj.name === selectedClass)
                .assignments.map((assignment) => (
                  role === 3 ? (
                    <AssignmentsRowStudent assignment={assignment} />
                  ) : null
                ))}
            </table>
          </div>
        ) : (
          <div>Select a class to see assignments</div>
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default AssignmentsPage;
