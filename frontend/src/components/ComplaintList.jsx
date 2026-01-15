import React from 'react';

const ComplaintList = ({ complaints }) => {
  return (
    <div style={{ 
      background: 'white', 
      padding: '2rem', 
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <h3>Recent Complaints</h3>
      <div style={{ marginTop: '1rem' }}>
        {complaints.map((complaint, index) => (
          <div 
            key={index} 
            style={{ 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '1rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <span style={{ fontWeight: 'bold', color: '#2563eb' }}>#{complaint.ticketId}</span>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                borderRadius: '20px',
                background: complaint.priority === 'High' ? '#fecaca' : 
                           complaint.priority === 'Medium' ? '#fef3c7' : '#d1fae5',
                color: complaint.priority === 'High' ? '#dc2626' : 
                       complaint.priority === 'Medium' ? '#92400e' : '#065f46',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {complaint.priority}
              </span>
            </div>
            <p>{complaint.text}</p>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: '1rem'
            }}>
              <span style={{ 
                background: '#e0e7ff', 
                color: '#3730a3', 
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem'
              }}>
                {complaint.department}
              </span>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                {new Date(complaint.timestamp).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintList;
