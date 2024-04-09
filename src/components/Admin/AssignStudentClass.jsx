import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudent from './AddStudent';

function AssignStudentClass() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/skoolhub/classes')
      .then((response) => {
        // console.log(response.data);
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
        // console.log(response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openModal = () => {
    if (!selectedClass) {
      alert('Please select a class');
      return;
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteStudentFromClass = (classId, studentId) => {
    axios.delete(`/skoolhub/classes/${classId}/students/${studentId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveClick = (studentId) => {
    deleteStudentFromClass(selectedClass, studentId);
  };

  const filteredStudents = students.filter((student) =>
  student.name.toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <div>
      ASSIGN STUDENT CLASS
      <button type="button" onClick={openModal}>Add Student</button>

      <select
        value={selectedClass}
        onChange={(e) => handleClassChange(e.target.value)}
      >
        <option value="">Select a class</option>
        {classes.map((classObj) => (
          <option key={classObj.id} value={classObj.id}>{classObj.name}</option>
        ))}
      </select>

      {selectedClass && (
        <label htmlFor="searchBar">
          Search:
          <input
            type="text"
            id="searchBar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
      )}

      {filteredStudents.length > 0 && (
        <div>
          <h2>Students</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td><button type="button" onClick={() => handleRemoveClick(student.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && <AddStudent closeModal={closeModal} studentsInClass={students} selectedClass={selectedClass} />}

    </div>
  );
}

export default AssignStudentClass;
