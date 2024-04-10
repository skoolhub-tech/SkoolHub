/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUserData } from '../data-providers/UserDataProvider';
import ClassesDropDownMenu from './ClassesDropDownMenu';
import AssignmentsTableStudent from './AssignmentsTableStudent';
import AssignmentsTableTeacher from './AssignmentsTableTeacher';
import ViewSubmissionModal from './ViewSubmissionModal';
import SubmittedAssignmentsTableTeacher from './SubmittedAssignmentsTableTeacher';
import CreateAssignmentModal from './CreateAssignmentModal';
import './assignments.css';

function AssignmentsPage() {
  const { userData: { email, role, id } } = useUserData();
  const [data, setData] = useState(null);
  const [viewSubmissionModalOpen, setViewSubmissionModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [assignmentId, setAssignmentId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [viewAssignmentSubmissions, setViewAssignmentSubmissions] = useState(null);
  const [createAssignmentModalOpen, setCreateAssignmentModalOpen] = useState(false);

  const getClassesAndAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`http://${process.env.SERVER_IP}:${process.env.PORT}/skoolhub/classesAndAssignments/${role}?email=${email}`);
      setData(response.data);
    } catch (error) {
      console.log(`Error fetching classes and assignments for student: ${error}`);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setViewSubmissionModalOpen(false);
  }, []);

  useEffect(() => {
    getClassesAndAssignments();
  }, [email, getClassesAndAssignments]);

  return data ? (
    <div className="assignments-container">
      <h1>Assignments</h1>
      <ClassesDropDownMenu
        classes={data}
        setSelectedClass={setSelectedClass}
      />
      {selectedClass && (
        <button type="button" className="create_assignment_button" onClick={() => setCreateAssignmentModalOpen(true)}>
          Create Assignment
        </button>
      )}
      {createAssignmentModalOpen && (
        <CreateAssignmentModal
          classObj={data.find((classObj) => classObj.name === selectedClass)}
          closeModal={() => setCreateAssignmentModalOpen(false)}
        />
      )}
      {viewAssignmentSubmissions && (
        <>
          <br />
          <br />
          <button
            type="button"
            className="back_button"
            onClick={() => setViewAssignmentSubmissions(null)}
          >
            Back
          </button>
        </>
      )}
      <div>
        {selectedClass ? (
          <div>
            <h2>
              Class:
              {' '}
              {selectedClass}
            </h2>
            {role === 3 && (
              <AssignmentsTableStudent
                data={data}
                selectedClass={selectedClass}
                getClassesAndAssignments={getClassesAndAssignments}
                setViewSubmissionModalOpen={setViewSubmissionModalOpen}
                setAssignmentId={setAssignmentId}
                viewSubmissionModalOpen={viewSubmissionModalOpen}
              />
            )}
            {role === 2 && viewAssignmentSubmissions === null && (
              <AssignmentsTableTeacher
                data={data}
                selectedClass={selectedClass}
                setStudentId={setStudentId}
                setAssignmentId={setAssignmentId}
                setViewAssignmentSubmissions={setViewAssignmentSubmissions}
              />
            )}
            {role === 2 && viewAssignmentSubmissions && (
              <>
                <h2>
                  Assignment:
                  {' '}
                  {viewAssignmentSubmissions.name}
                </h2>
                <SubmittedAssignmentsTableTeacher
                  assignment={viewAssignmentSubmissions}
                  setViewAssignmentSubmissions={setViewAssignmentSubmissions}
                />
              </>
            )}
          </div>
        ) : (
          <div>
            <br />
            Select a class to see assignments
          </div>
        )}
      </div>
      {viewSubmissionModalOpen && assignmentId && (
        <ViewSubmissionModal
          assignmentId={assignmentId}
          classId={data.find((classObj) => classObj.name === selectedClass).id}
          studentId={id}
          onCloseModal={handleCloseModal}
        />
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default AssignmentsPage;
