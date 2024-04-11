import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoPersonAdd } from 'react-icons/io5';
import AddStudent from './AddStudent';

function AssignStudentClass() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const fetchClasses = () => {
    axios.get('/skoolhub/classes')
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
      // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const fetchStudentsInClass = (classId) => {
    axios.get(`/skoolhub/classes/${classId}/students`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleClassChange = (classId) => {
    setSelectedClass(classId);
    if (!classId) {
      setStudents([]);
      return;
    }
    setAlertMessage('');
    fetchStudentsInClass(classId);
  };

  const openModal = () => {
    if (!selectedClass) {
      setAlertMessage('*Please select a class');
    } else {
      setShowModal(true);
      setAlertMessage('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteStudentFromClass = (classId, studentId) => {
    axios.delete(`/skoolhub/classes/${classId}/students/${studentId}`)
      .then(() => {
        fetchStudentsInClass(classId);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const handleRemoveClick = (studentId) => {
    deleteStudentFromClass(selectedClass, studentId);
  };

  const filteredStudents = students.filter(
    (student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function getSelectedClassName() {
    const selectedClassObj = classes.find(
      (classObj) => String(classObj.id) === String(selectedClass),
    );
    if (selectedClassObj) {
      return selectedClassObj.name;
    }
    return '';
  }

  return (
    <div>

      <div className="admin-students-list">
        <div>
          <div>
            <select
              className="admin-dropdown"
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
            >
              <option value="">Select a class</option>
              {classes.map((classObj) => (
                <option key={classObj.id} value={classObj.id}>{classObj.name}</option>
              ))}
            </select>
          </div>
          <div className="admin-header">

            <label
              className="admin-search-bar"
              htmlFor="searchBar"
            >
              Search:
              {' '}
              {' '}
              <input
                type="text"
                id="searchBar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
            <h2 className="admin-h2">
              {selectedClass !== '' ? getSelectedClassName() : ''}
            </h2>
            <div className="admin-addstudent-container">
              {alertMessage && <div className="admin-addstudent-alert">{alertMessage}</div>}
              <button className="add-student-button" type="button" onClick={openModal} aria-label="Add Student"><IoPersonAdd size={20} /></button>
            </div>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  {/* <td>{student.id}</td> */}
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td><button type="button" onClick={() => handleRemoveClick(student.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal
        && (
        <AddStudent
          closeModal={closeModal}
          studentsInClass={students}
          selectedClass={selectedClass}
          fetchStudentsInClass={fetchStudentsInClass}
        />
        )}

    </div>
  );
}

export default AssignStudentClass;
