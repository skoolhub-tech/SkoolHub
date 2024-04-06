import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sendEmail from '../../utils/sendEmail';
import EmailModal from './EmailModal';
import DropDown from './DropDownSelector';
import DraftEmailButton from './DraftEmailButton';
import PeopleList from './PeopleList';

function EmailComponent({ userEmail, userName }) {
  const [potentialEmailees, setPotentialEmailees] = useState([]);
  const [receiverEmailList, setRecieverEmailList] = useState({});
  const [classes, setClasses] = useState(['class1', 'class2']);
  const [currentClass, setCurrentClass] = useState('');

  //need to get the names and emails of the people in the class

  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    sender: userName,
    senderEmail: userEmail,
    receiverEmail: '',
  });
  const [emailModal, setEmailModal] = useState(false);
  // get list of classes from the database
  /*
  useEffect(() => {
    axios.get('/skoolhub/classes')
      .then((response) => {
        console.log(response.data);
        setClasses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  */
  const email = async (e) => {
    e.preventDefault();
    const response = await sendEmail(formData);
    if (response === 'Email Sent!') {
      setEmailSent(true);
      setErrorMessage('');
    } else {
      setEmailSent(false);
      setErrorMessage(response);
    }
  };

    // get the list of people and their emails in the class
    // data should be an array of objects with name and email
    // setPotentialEmailees(people);
  const handleClassChange = (classId) => {
    setCurrentClass(classId);
    if (!classId) {
      setPotentialEmailees([]);
      return;
    }
    axios.get(`/skoolhub/classes/${classId}/students`)
      .then((response) => {
        console.log(response.data);
        setPotentialEmailees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <DropDown
        classes={classes}
        currentClass={setCurrentClass}
        handleClassChange={handleClassChange}
      />
      <DraftEmailButton setEmailModal={setEmailModal} />
      <PeopleList
        currentClass={currentClass}
        potentialEmailees={potentialEmailees}
        receiverEmailList={receiverEmailList}
        setRecieverEmailList={setRecieverEmailList}
      />
      {emailModal && (
        <EmailModal
          setEmailModal={setEmailModal}
          setFormData={setFormData}
          formData={formData}
          email={email}
        />
      )}
    </div>
  );
}

export default EmailComponent;

// const [emailSent, setEmailSent] = useState(false);
// const [errorMessage, setErrorMessage] = useState('');
// {emailSent && <p>Email Sent!</p>}
// {errorMessage && <p>{errorMessage}</p>}
