import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sendEmail from '../../utils/sendEmail';
import EmailModal from './EmailModal';
import DropDown from './DropDownSelector';
import DraftEmailButton from './DraftEmailButton';
import PeopleList from './PeopleList';
import { useUserData } from '../data-providers/UserDataProvider';
/*
  for testing email util fn is commented out
  user friendly error message / success message is commented out
  update sender name once dataprovider is updated
*/
function Email() {
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

  // change this to just the teachers classes
  useEffect(() => {
    axios.get(`/skoolhub/classes/${userData.email}`)
      .then((response) => {
        setClasses(response.data);
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
      sender: '',
      senderEmail: userData.email,
      receiverEmail: emailList,
    };
    console.log(data, 'data');
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

  // get students in class set state to list of student Objects
  const handleClassChange = (classObj) => {
    setRecieverEmailList({});
    if (classObj === 'Faculty') {
      setCurrentClass({ name: 'Faculty' });
      setPotentialEmailees([]);
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
    <div>
      {emailSent && <p>Email Sent!</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <DropDown
        classes={classes}
        handleClassChange={handleClassChange}
      />
      <DraftEmailButton setEmailModal={setEmailModal} />
      {potentialEmailees.length > 0 && (
        <PeopleList
          currentClass={currentClass}
          potentialEmailees={potentialEmailees}
          receiverEmailList={receiverEmailList}
          setRecieverEmailList={setRecieverEmailList}
        />
      )}
      {emailModal && (
        <EmailModal
          setEmailModal={setEmailModal}
          setMessage={setBody}
          setSubject={setSubjectLine}
          email={email}
        />
      )}
    </div>
  );
}

export default Email;
