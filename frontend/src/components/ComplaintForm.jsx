import React, { useState } from 'react';

const ComplaintForm = ({ onSubmit }) => {
  const [complaint, setComplaint] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complaint.trim()) {
      const mockData = {
        text: complaint,
        ticketId: `GRV${Date.now().toString().slice(-8)}`,
        department: ['Water Supply', 'Electricity', 'Sanitation'][Math.floor(Math.random() * 3)],
        priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        timestamp: new Date().toISOString()
      };
      onSubmit(mockData);
      setComplaint('');
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <h1>Submit Your Grievance</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            
          </label>
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Describe your issue in natural language..."
            style={{
              width: '100%',
              padding: '1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontFamily: 'inherit',
              fontSize: '1rem',
              
            }}
            rows="6"
            required
          />
          
        </div>
        <button
          type="submit"
          style={{
            background: '#2563eb',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          Submit Grievance
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;