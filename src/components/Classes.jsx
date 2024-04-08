/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserData } from './data-providers/UserDataProvider';

function Classes() {
  const { userData } = useUserData();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`/skoolhub/classes/${userData.email}`)
      .then((response) => {
        console.log(response.data);
        setClasses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClassChange = (classId) => {
    setSelectedClass(classId);
    if (!classId) {
      setStudents([]);
      return;
    }
    axios.get(`/skoolhub/classes/${classId}/students`)
      .then((response) => {
        console.log(response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Classes</h1>
      <select
        value={selectedClass}
        onChange={(e) => handleClassChange(e.target.value)}
      >
        <option value="">Select a class</option>
        {classes.map((classObj) => (
          <option key={classObj.id} value={classObj.id}>{classObj.name}</option>
        ))}
      </select>
      {students.length > 0 && (
        <div>
          <h2>Students</h2>
          <ul>
            {students.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Classes;
