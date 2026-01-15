import React from 'react';
import ComplaintForm from '../components/ComplaintForm';

const SubmitComplaint = () => {
  const handleSubmit = (data) => {
    alert(`Complaint submitted! Ticket ID: ${data.ticketId}`);
  };

  return (
    <div>
      
      <ComplaintForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SubmitComplaint;