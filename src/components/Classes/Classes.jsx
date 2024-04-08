/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserData } from '../data-providers/UserDataProvider';
import StudentGradesModal from './StudentGradesModal';
import StudentTable from './StudentTable';
import './classes.css';

function Classes() {
  const { userData } = useUserData();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedClassName, setSelectedClassName] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleClassChange = (classId, className) => {
    setSelectedClassName(className);
    setSelectedClass(classId);
    if (!classId) {
      setStudents([]);
      return;
    }
    axios.get(`/skoolhub/classes/${classId}/students`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleStudentClick = (student) => {
    console.log(student);
    setSelectedStudent(student);
    setShowModal(true);
  };

  return (
    <div>
      {!showModal && (
        <>
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
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>View Grades</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>
                        <button type="button" onClick={() => handleStudentClick(student)}>View Grades</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      {showModal && selectedStudent && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <StudentGradesModal
              studentName={selectedStudent.name}
              studentId={selectedStudent.id}
              classId={selectedClass}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Classes;
