import React from 'react';

function DraftEmailButton({ setEmailModal }) {
  // clicking this button will open the email modal
  return (
    <button type="button" onClick={() => setEmailModal(true)}>Draft Email</button>
  );
}

export default DraftEmailButton;
