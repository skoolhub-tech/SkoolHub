import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MdOutlineMarkEmailRead } from "react-icons/md";
import './emailsComponent.css';
import sendEmail from '../../utils/sendEmail';
import EmailModal from './EmailModal';
import DropDown from './DropDownSelector';
import PeopleList from './PeopleList';
import ThresholdInput from './ThresholdInput';
import Notify from '../Notify';
import { useUserData } from '../data-providers/UserDataProvider';

function EmailTeachersView() {
  const { userData } = useUserData();
  // conditional render states
  const [notify, setNotify] = useState(false);
  const [color, setColor] = useState(0);
  const [message, setMessage] = useState('');
  const [icon, setIcon] = useState(<MdOutlineMarkEmailRead />);
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

  function showNotificationTimer() {
    setNotify(true);
    setTimeout(() => {
      setNotify(false);
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
      setEmailModal(false);
    } else {
      setEmailSent(false);
      setErrorMessage(response);
      setEmailModal(false);
    } */
  };

  // get students in class set state to list of student Objects
  const handleClassChange = (classObj) => {
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
    <motion.div
      className="emails"
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      transition={{ ease: 'easeInOut', duration: 0.7 }}
    >
      <div className="emailsDiv">
        <h1>Email</h1>
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
            setColor={setColor}
            setMessage={setMessage}
            setIcon={setIcon}
            showNotificationTimer={showNotificationTimer}
          />
        )}
        {notify && (
          <Notify
            message={message}
            color={color}
            icon={icon}
          />
        )}
      </div>
    </motion.div>
  );
}

export default EmailTeachersView;
