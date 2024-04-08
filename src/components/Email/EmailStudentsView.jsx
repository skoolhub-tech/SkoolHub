import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './emailsComponent.css';
import sendEmail from '../../utils/sendEmail';
import EmailModal from './EmailModal';
import PeopleList from './PeopleList';
import { useUserData } from '../data-providers/UserDataProvider';

// userData needs to contain id, email, name, and role
function EmailStudentsView() {
  const { userData } = useUserData();
  // conditional render states
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
    console.log(data, 'data');
    console.log('sent to', data.receiverEmail);
    setEmailModal(false);
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
    <div className="emailsDiv">
      <h1>Send an Email</h1>
      {emailSent && <p>Email Sent!</p>}
      {errorMessage && <p>{errorMessage}</p>}
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
        />
      )}
    </div>
  );
}

export default EmailStudentsView;
