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
        setClasses(response.data);
        setSelectedClass(response.data[0].id);
        setSelectedClassName(response.data[0].name);
        axios.get(`/skoolhub/classes/${response.data[0].id}/students`)
          .then((reply) => {
            setStudents(reply.data);
          })
          .catch((error) => {
            console.error(error);
          });
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
    <div className="classes">
      <div className="class-header">
        <h1>Classes</h1>
      </div>
      <div className="class-dropdown">
        <select
          value={selectedClass}
          onChange={(e) => handleClassChange(
            e.target.value,
            e.target.options[e.target.selectedIndex].text,
          )}
        >
          <option value="">Select a class</option>
          {classes.map((classObj) => (
            <option key={classObj.id} value={classObj.id}>{classObj.name}</option>
          ))}
        </select>
      </div>
      {students.length > 0 && (
      <div className="selected-class">
        <div>
          <h2 className="selected-class-header">{selectedClassName}</h2>
        </div>
        <div className="student-table">
          <StudentTable students={students} handleStudentClick={handleStudentClick} />
        </div>
      </div>
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
