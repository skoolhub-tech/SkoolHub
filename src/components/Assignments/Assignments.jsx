/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useUserData } from '../data-providers/UserDataProvider';
import ClassesDropDownMenu from './ClassesDropDownMenu';
import AssignmentsTableStudent from './AssignmentsTableStudent';
import AssignmentsTableTeacher from './AssignmentsTableTeacher';
import ViewSubmissionModal from './ViewSubmissionModal';
import SubmittedAssignmentsTableTeacher from './SubmittedAssignmentsTableTeacher';
import './assignments.css';

function AssignmentsPage() {
  const { userData: { email, role, id } } = useUserData();
  const [data, setData] = useState(null);
  const [viewSubmissionModalOpen, setViewSubmissionModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [assignmentId, setAssignmentId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [viewAssignmentSubmissions, setViewAssignmentSubmissions] = useState(null);
  const [submitAssignmentModalIsOpen, setSubmitAssignmentModalIsOpen] = useState(false);
  const [classObjForEmail, setClassObjForEmail] = useState(null);

  const getClassesAndAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`/skoolhub/classesAndAssignments/${role}?email=${email}`);
      setData(response.data);
    } catch (error) {
      console.log(`Error fetching classes and assignments: ${error}`);
    }
  }, [role, email]);

  const handleCloseModal = useCallback(() => {
    setViewSubmissionModalOpen(false);
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedClass(data[0].name);
      setClassObjForEmail(data[0]);
    }
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
    <motion.div
      className="assignments_motion_div"
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      transition={{ ease: 'easeInOut', duration: 0.7 }}
    >
      <div
        className="assignments-container"
      >
        <h1>Assignments</h1>
        <div className="classes-dropdown-create-assignment">
          {viewAssignmentSubmissions === null && (
          <ClassesDropDownMenu
            classes={data}
            setSelectedClass={setSelectedClass}
            setSubmitAssignmentModalIsOpen={setSubmitAssignmentModalIsOpen}
            setClassObjForEmail={setClassObjForEmail}
          />
          )}
        </div>
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
              {role === 3 && (
                <AssignmentsTableStudent
                  data={data}
                  selectedClass={selectedClass}
                  getClassesAndAssignments={getClassesAndAssignments}
                  setViewSubmissionModalOpen={setViewSubmissionModalOpen}
                  setAssignmentId={setAssignmentId}
                  viewSubmissionModalOpen={viewSubmissionModalOpen}
                  submitAssignmentModalIsOpen={submitAssignmentModalIsOpen}
                  setSubmitAssignmentModalIsOpen={setSubmitAssignmentModalIsOpen}
                />
              )}
              {role === 2 && viewAssignmentSubmissions === null && (
                <AssignmentsTableTeacher
                  data={data}
                  selectedClass={selectedClass}
                  setAssignmentId={setAssignmentId}
                  setViewAssignmentSubmissions={setViewAssignmentSubmissions}
                  getClassesAndAssignments={getClassesAndAssignments}
                  viewAssignmentSubmissions={viewAssignmentSubmissions}
                  role={role}
                />
              )}
              {role === 2 && viewAssignmentSubmissions && (
                <SubmittedAssignmentsTableTeacher
                  assignment={viewAssignmentSubmissions}
                  setViewAssignmentSubmissions={setViewAssignmentSubmissions}
                  setStudentId={setStudentId}
                  setViewSubmissionModalOpen={setViewSubmissionModalOpen}
                  setAssignmentId={setAssignmentId}
                  studentId={studentId}
                  classObjForEmail={classObjForEmail}
                />
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
            classObjForEmail={classObjForEmail}
          />
        )}
      </div>
    </motion.div>
  ) : (
    <div>Loading...</div>
  );
}

export default AssignmentsPage;
