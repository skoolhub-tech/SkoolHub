import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './emailsComponent.css';
import sendEmail from '../../utils/sendEmail';
import EmailModal from './EmailModal';
import PeopleList from './PeopleList';
import Notify from '../Notify';
import { useUserData } from '../data-providers/UserDataProvider';

// userData needs to contain id, email, name, and role
function EmailStudentsView() {
  const { userData } = useUserData();
  // conditional render states
  const [notify, setNotify] = useState(false);
  const [color, setColor] = useState(0);
  const [message, setMessage] = useState('');
  const [icon, setIcon] = useState(<MdOutlineMarkEmailRead />);
  const [emailModal, setEmailModal] = useState(false);
  // View states/data
  const [potentialEmailees, setPotentialEmailees] = useState([]);
  const currentClass = { name: 'Your Teachers and Faculty' };
  // email form data
  const [subjectLine, setSubjectLine] = useState('');
  const [body, setBody] = useState('');
  const [receiverEmailList, setRecieverEmailList] = useState({});

  // get students classes,teachers, and admin
  useEffect(() => {
    Promise.all([
      axios.get(`/skoolhub/teachersclasses/${userData.id}`),
      axios.get('/skoolhub/admin'),
    ])
      .then(([teachersClassesResponse, adminResponse]) => {
        const adminsWithClass = adminResponse.data.map((admin) => ({
          ...admin,
          class: 'Admin',
        }));
        const combinedData = [...teachersClassesResponse.data, ...adminsWithClass];
        setPotentialEmailees(combinedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function showNotificationTimer() {
    setNotify(true);
    setTimeout(() => {
      setNotify(false);
    }, 2000);
  }

  // sends email to all selected teachers
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
    console.log('Email sent to', data.receiverEmail);
    setEmailModal(false);
    setColor(0);
    setMessage('Email Sent!');
    showNotificationTimer();
    setSubjectLine('');
    setBody('');
    /*
    const response = await sendEmail(data);
    if (response === 'Email Sent!') {
      setEmailSent(true);
      setErrorMessage('');
    } else {
      setEmailSent(false);
      setErrorMessage(response);
    } */
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
      </motion.div>
      {emailModal && (
        <EmailModal
          setEmailModal={setEmailModal}
          setMessage={setBody}
          setSubject={setSubjectLine}
          email={email}
          subject={subjectLine}
          body={body}
        />
      )}
      {notify && (
        <Notify
          message={message}
          color={color}
          icon={icon}
        />
      )}
    </>
  );
}

export default EmailStudentsView;
