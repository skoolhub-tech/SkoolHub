import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sendEmail from '../../utils/sendEmail';
import EmailModal from './EmailModal';
import DropDown from './DropDownSelector';
import DraftEmailButton from './DraftEmailButton';
import PeopleList from './PeopleList';
// test with actual teacher and see their class and class list update correctly
function Email({ userEmail, userName }) {
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [potentialEmailees, setPotentialEmailees] = useState([]);
  const [receiverEmailList, setRecieverEmailList] = useState({});
  const [classes, setClasses] = useState([]);//
  const [currentClass, setCurrentClass] = useState('');
  const [body, setBody] = useState('');
  const [subjectLine, setSubjectLine] = useState('');
  const [emailModal, setEmailModal] = useState(false);

  // change this to just the teachers classes
  useEffect(() => {
    axios.get('/skoolhub/classes')
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // sends email
  const email = async (e) => {
    e.preventDefault();
    const emailList = Object.keys(receiverEmailList).join(', ');
    const data = {
      subject: subjectLine,
      message: body,
      sender: userName,
      senderEmail: userEmail,
      receiverEmail: emailList,
    };
    const response = await sendEmail(data);
    if (response === 'Email Sent!') {
      setEmailSent(true);
      setErrorMessage('');
    } else {
      setEmailSent(false);
      setErrorMessage(response);
    }
  };

  // get students in class set state to list of student Objects
  const handleClassChange = (classObj) => {
    setCurrentClass(classObj);
    if (!classObj) {
      setPotentialEmailees([]);
      return;
    }
    axios.get(`/skoolhub/classes/${classObj.id}/students`)
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
      {emailSent && <p>Email Sent!</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <DropDown
        classes={classes}
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
          setMessage={setBody}
          setSubject={setSubjectLine}
          email={email}
        />
      )}
    </div>
  );
}

export default Email;
