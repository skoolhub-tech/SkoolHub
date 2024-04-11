import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './emailsComponent.css';
import sendEmail from '../../utils/sendEmail';
import EmailModal from './EmailModal';
import AdminDropDown from './AdminDropDown';
import PeopleList from './PeopleList';
import EmailNotify from './EmailNotify';
import { useUserData } from '../data-providers/UserDataProvider';
// all teachers, all students, and all admin
// need drop down to be teachers, students, admin
// cards need to list their name and class/admin
function EmailAdminView() {
  const { userData } = useUserData();
  // conditional render states
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailModal, setEmailModal] = useState(false);
  // View states/data
  const [potentialEmailees, setPotentialEmailees] = useState([]);
  const views = ['Teachers', 'Students', 'Admin'];
  const [currentClass, setCurrentClass] = useState({ name: 'Teachers' });
  // email form data
  const [subjectLine, setSubjectLine] = useState('');
  const [body, setBody] = useState('');
  const [receiverEmailList, setRecieverEmailList] = useState({});
  useEffect(() => {
    axios.get('/skoolhub/teachersclasses')
      .then((response) => {
        setPotentialEmailees(response.data);
      })
      .catch((error) => {
        setPotentialEmailees([]);
      });
  }, []);

  function showEmailSentTimer() {
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
    }, 2000);
  }
  // sends email to all selected selected people in class/faculty
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
    console.log(data, 'data');
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

  // get all students if 'students' get all teachers if 'teachers' get all admin if 'admin'
  const handleDropdownChange = (classObj) => {
    setRecieverEmailList({});
    if (classObj === 'Teachers') {
      setCurrentClass({ name: 'Teachers' });
      axios.get('/skoolhub/teachersclasses')
        .then((response) => {
          setPotentialEmailees(response.data);
        })
        .catch((error) => {
          console.error(error);
          setPotentialEmailees([]);
        });
      return;
    }
    if (classObj === 'Students') {
      setCurrentClass({ name: 'Students' });
      axios.get('/skoolhub/students')
        .then((response) => {
          setPotentialEmailees(response.data);
        })
        .catch((error) => {
          console.error(error);
          setPotentialEmailees([]);
        });
      return;
    }
    if (classObj === 'Admin') {
      setCurrentClass({ name: 'Admin' });
      axios.get('/skoolhub/admin')
        .then((response) => {
          const filteredData = response.data.filter((user) => user.email !== userData.email);
          setPotentialEmailees(filteredData);
        })
        .catch((error) => {
          console.error(error);
          setPotentialEmailees([]);
        });
    }
  };
// drop down to select teacher
  return (
    <motion.div
      className="emailsDiv"
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      transition={{ ease: 'easeInOut', duration: 0.7 }}
    >
      <div className="emailsDiv-without-modal">
        <h1>Email</h1>
        {errorMessage && <p>{errorMessage}</p>}
        <AdminDropDown
          views={views}
          handleDropdownChange={handleDropdownChange}
        />
        {potentialEmailees.length > 0 && (
          <PeopleList
            currentClass={currentClass}
            potentialEmailees={potentialEmailees}
            receiverEmailList={receiverEmailList}
            setRecieverEmailList={setRecieverEmailList}
            setEmailModal={setEmailModal}
          />
        )}
      </div>
      {emailModal && (
        <EmailModal
          setEmailModal={setEmailModal}
          setMessage={setBody}
          setSubject={setSubjectLine}
          subject={subjectLine}
          body={body}
          email={email}
        />
      )}
    </motion.div>
  );
}

export default EmailAdminView;
