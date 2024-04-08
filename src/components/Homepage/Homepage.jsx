import React from 'react';
import axios from 'axios';
import { useUserData } from '../data-providers/UserDataProvider';

const { useState, useEffect } = React;

function Homepage() {
  const { userData } = useUserData();
  const [classes, setClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`/skoolhub/classes/${userData.email}`)
      .then((response) => setClasses(response.data))
      .catch((error) => console.error({
        Message: 'Error retrieving classes.',
        Error: error,
      }));
    // get calendar
    // axios.get(`/skoolhub/calendar/${userData.email}`)
    //   .then((response) => setAssignments(response.data))
    //   .catch((error) => console.error({
    //     Message: 'Error retrieving assignments.',
    //     Error: error,
    //   }));
    // get assignments
  }, []);

  return (
    <div>
      {/* <h1>Homepage</h1> */}
      <select value={currentClass} onChange={(e) => setCurrentClass(e.target.Value)}>
        <option value="">Select a class</option>
        {classes.map((classObj) => (
          <option key={classObj.id} value={classObj.id}>{classObj.name}</option>
        ))}
      </select>
      {assignments.length > 0 && (
        <div>
          <h2>Assignments</h2>
          <ul>
            {assignments.map((assignment) => (
              <li key={assignment.id}>{assignment.name}</li>
            ))}
          </ul>
        </div>
      )}
      {tasks.length > 0 && (
        <div>
          <h2>Today's Tasks</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Homepage;
