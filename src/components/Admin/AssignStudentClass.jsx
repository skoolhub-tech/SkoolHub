import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudent from './AddStudent';

function AssignStudentClass() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('/skoolhub/classes')
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

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  return (
    <div>
      ASSIGN STUDENT CLASS
      <button type="button" onClick={toggleModal}>Add Student</button>

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
              <li key={student.id}>
                {student.id}-
                {student.name}-
                {student.email}
                <button type="button">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}

    {showModal && <AddStudent closeModal={toggleModal} studentsInClass={students} />}

    </div>
  );
}

export default AssignStudentClass;
