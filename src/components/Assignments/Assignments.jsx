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
      const response = await axios.get(`/skoolhub/classesAndAssignments/${role}?email=${email}`);
      setData(response.data);
    } catch (error) {
      console.log(`Error fetching classes and assignments: ${error}`);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setViewSubmissionModalOpen(false);
  }, []);

  useEffect(() => {
    if (data) setSelectedClass(data[0].name);
  }, [data]);

  useEffect(() => {
    getClassesAndAssignments();
  }, [email, getClassesAndAssignments]);

  useEffect(() => {
    if (role === 3) {
      setStudentId(id);
    }
  }, [role, id]);

  return data ? (
    <div className="assignments-container">
      <h1>Assignments</h1>
      <div className="classes-dropdown-create-assignment">
        {viewAssignmentSubmissions === null && (
        <ClassesDropDownMenu
          classes={data}
          setSelectedClass={setSelectedClass}
        />
        )}
        {selectedClass && !viewAssignmentSubmissions && role === 2 && (
        <button type="button" className="create_assignment_button" onClick={() => setCreateAssignmentModalOpen(true)}>
          Create Assignment
        </button>
        )}
      </div>
      {createAssignmentModalOpen && (
        <CreateAssignmentModal
          classObj={data.find((classObj) => classObj.name === selectedClass)}
          closeModal={() => setCreateAssignmentModalOpen(false)}
          getClassesAndAssignments={getClassesAndAssignments}
        />
      )}
      {viewAssignmentSubmissions && (
        <>
          <button
            type="button"
            className="back_button"
            onClick={() => setViewAssignmentSubmissions(null)}
          >
            Back
          </button>
          <br />
          <br />
        </>
      )}
      <div>
        {selectedClass ? (
          <div className="assignments_table_student">
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
                setAssignmentId={setAssignmentId}
                setViewAssignmentSubmissions={setViewAssignmentSubmissions}
                getClassesAndAssignments={getClassesAndAssignments}
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
                  setStudentId={setStudentId}
                  setViewSubmissionModalOpen={setViewSubmissionModalOpen}
                  setAssignmentId={setAssignmentId}
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
      {viewSubmissionModalOpen && assignmentId && studentId && (
        <ViewSubmissionModal
          assignmentId={assignmentId}
          classId={data.find((classObj) => classObj.name === selectedClass).id}
          studentId={studentId}
          onCloseModal={handleCloseModal}
        />
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default AssignmentsPage;
