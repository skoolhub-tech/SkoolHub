import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './emailsComponent.css';
import sendEmail from '../../utils/sendEmail';
import EmailModal from './EmailModal';
import DropDown from './DropDownSelector';
import PeopleList from './PeopleList';
import ThresholdInput from './ThresholdInput';
import EmailNotify from './EmailNotify';
import { useUserData } from '../data-providers/UserDataProvider';
// userData needs to contain id, email, name, and role
function EmailTeachersView() {
  const { userData } = useUserData();
  // conditional render states
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailModal, setEmailModal] = useState(false);
  const [openThreshold, setOpenThreshold] = useState(false);
  // View states/data
  const [potentialEmailees, setPotentialEmailees] = useState([]);
  const [classes, setClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState({ name: 'select a class' });
  const [threshold, setThreshold] = useState(100);
  // email form data
  const [subjectLine, setSubjectLine] = useState('');
  const [body, setBody] = useState('');
  const [receiverEmailList, setRecieverEmailList] = useState({});
  // if template chosen have option to save its value // into database?
  const [selectedTemplate, setSelectedTemplate] = useState('writeYourOwnEmail');

  // change this to just the teachers classes
  useEffect(() => {
    setCurrentClass({ name: 'Faculty' });
    Promise.all([
      axios.get('/skoolhub/admin'),
      axios.get('/skoolhub/teachersclasses'),
      axios.get(`/skoolhub/classes/${userData.email}`),
    ])
      .then(([adminResponse, teachersResponse, classesResponse]) => {
        const adminData = adminResponse.data.map((admin) => ({
          ...admin,
          class: 'Admin',
        }));
        const teachersData = teachersResponse.data.filter(
          (teacher) => teacher.email !== userData.email,
        );
        const combinedData = [...adminData, ...teachersData];
        setPotentialEmailees(combinedData);
        setClasses(classesResponse.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function showEmailSentTimer() {
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
    }, 2000);
  }

  // sends email to all selected selected people in receiver email list
  const email = async (e) => {
    e.preventDefault();
    const emailList = Object.keys(receiverEmailList).join(', ');
    const data = {
      subject: subjectLine,
      message: body,
      sender: userData.name,
      senderEmail: userData.email,
      receiverEmail: emailList,
    };
    console.log('sent to', data.receiverEmail);
    setEmailModal(false);
    setSubjectLine('');
    setBody('');
    /*
    const response = await sendEmail(data);
    if (response === 'Email Sent!') {
      setEmailSent(true);
      setErrorMessage('');
      setEmailModal(false);
    } else {
      setEmailSent(false);
      setErrorMessage(response);
      setEmailModal(false);
    } */
  };
  // get students in class set state to list of student Objects
  const handleClassChange = (classObj) => {
    setEmailSent(false);
    setSubjectLine('');
    setBody('');
    setRecieverEmailList({});
    if (classObj === 'Faculty') {
      setCurrentClass({ name: 'Faculty' });
      Promise.all([
        axios.get('/skoolhub/admin'),
        axios.get('/skoolhub/teachersclasses'),
      ])
        .then(([adminResponse, teachersResponse]) => {
          const adminData = adminResponse.data.map((admin) => ({
            ...admin,
            class: 'Admin',
          }));
          const teachersData = teachersResponse.data.filter(
            (teacher) => teacher.email !== userData.email,
          );
          const combinedData = [...adminData, ...teachersData];
          setPotentialEmailees(combinedData);
        })
        .catch((error) => {
          console.error(error);
          setPotentialEmailees([]);
        });
      return;
    }
    setCurrentClass(classObj);
    if (!classObj) {
      setPotentialEmailees([]);
      return;
    }
    Promise.all([
      axios.get(`/skoolhub/classes/${classObj.id}/students`),
      axios.get(`/skoolhub/classes/${classObj.id}/threshold`),
    ])
      .then(([response, thresholdResponse]) => {
        setPotentialEmailees(response.data);
        setThreshold(thresholdResponse.data[0].threshold);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <motion.div
        className="emailsDiv"
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        transition={{ ease: 'easeInOut', duration: 0.7 }}
      >
        <div className="emailsDiv-without-modal">
          <h1>Email</h1>
          {errorMessage && <p>{errorMessage}</p>}
          <DropDown
            classes={classes}
            handleClassChange={handleClassChange}
          />
          {potentialEmailees.length > 0 && (
            <PeopleList
              currentClass={currentClass}
              potentialEmailees={potentialEmailees}
              receiverEmailList={receiverEmailList}
              setRecieverEmailList={setRecieverEmailList}
              setEmailModal={setEmailModal}
              threshold={threshold}
              setThreshold={setThreshold}
              setOpenThreshold={setOpenThreshold}
            />
          )}
        </div>
      </motion.div>
      <div>
        {emailModal && (
          <EmailModal
            setEmailModal={setEmailModal}
            setMessage={setBody}
            setSubject={setSubjectLine}
            email={email}
            subject={subjectLine}
            body={body}
            currentClass={currentClass}
            setSelectedTemplate={setSelectedTemplate}
          />
        )}
        {openThreshold && (
          <ThresholdInput
            currentClass={currentClass}
            setThreshold={setThreshold}
            threshold={threshold}
            setOpenThreshold={setOpenThreshold}
          />
        )}
      </div>
    </>
  );
}

export default EmailTeachersView;
