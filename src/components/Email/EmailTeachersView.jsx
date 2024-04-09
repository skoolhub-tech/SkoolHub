import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './emailsComponent.css';
import sendEmail from '../../utils/sendEmail';
import EmailModal from './EmailModal';
import DropDown from './DropDownSelector';
import PeopleList from './PeopleList';
import { useUserData } from '../data-providers/UserDataProvider';

// userData needs to contain id, email, name, and role
function EmailTeachersView() {
  const { userData } = useUserData();
  // conditional render states
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailModal, setEmailModal] = useState(false);
  // View states/data
  const [potentialEmailees, setPotentialEmailees] = useState([]);
  const [classes, setClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState({ name: 'select a class' });
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
    axios.get(`/skoolhub/classes/${classObj.id}/students`)
      .then((response) => {
        setPotentialEmailees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="emailsDiv">
      <h1>Email</h1>
      {emailSent && <p>Email Sent!</p>}
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
        />
      )}
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
    </div>
  );
}

export default EmailTeachersView;
