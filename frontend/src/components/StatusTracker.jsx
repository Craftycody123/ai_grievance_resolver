import React, { useState } from 'react';

const StatusTracker = () => {
  const [ticketId, setTicketId] = useState('');

  const handleTrack = () => {
    if (!ticketId) return;
    alert(`Tracking ticket: ${ticketId}`);
  };

  return (
    <div style={{ 
      background: 'white', 
      padding: '2rem', 
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <h2>Track Your Grievance Status</h2>
      <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0' }}>
        <input
          type="text"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          placeholder="Enter Ticket ID (e.g., GRV12345678)"
          style={{
            flex: 1,
            padding: '1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '1rem'
          }}
        />
        <button
          onClick={handleTrack}
          style={{
            background: '#2563eb',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Track Status
        </button>
      </div>
    </div>
  );
};

export default StatusTracker;