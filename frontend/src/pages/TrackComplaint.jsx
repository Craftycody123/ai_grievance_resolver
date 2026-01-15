import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const TrackComplaint = () => {
  const [ticketId, setTicketId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock tracking data for demonstration
  const mockTrackingData = {
    ticketId: 'GRV202400123',
    complaint: 'Water supply disruption in Sector 15 for past 48 hours',
    department: 'Water Supply Department',
    priority: 'High',
    status: 'in-progress',
    currentStage: 3,
    submittedDate: '2024-01-10 10:30 AM',
    estimatedResolution: '2024-01-13',
    assignedOfficer: 'Rajesh Kumar',
    officerContact: 'rajesh.kumar@watersupply.gov.in',
    timeline: [
      { 
        id: 1, 
        date: '2024-01-10 10:30 AM', 
        stage: 'Submitted', 
        description: 'Complaint received via web portal',
        icon: '📝',
        completed: true
      },
      { 
        id: 2, 
        date: '2024-01-10 10:35 AM', 
        stage: 'AI Analysis', 
        description: 'AI processed complaint - Identified Water Supply Department',
        icon: '🤖',
        completed: true
      },
      { 
        id: 3, 
        date: '2024-01-10 11:00 AM', 
        stage: 'Assigned', 
        description: 'Assigned to Officer Rajesh Kumar',
        icon: '👤',
        completed: true
      },
      { 
        id: 4, 
        date: '2024-01-10 02:30 PM', 
        stage: 'Field Visit', 
        description: 'Field officer visited the location',
        icon: '📍',
        completed: true
      },
      { 
        id: 5, 
        date: '2024-01-11 09:00 AM', 
        stage: 'In Progress', 
        description: 'Repair work initiated',
        icon: '🛠️',
        completed: true,
        current: true
      },
      { 
        id: 6, 
        date: 'Estimated', 
        stage: 'Resolution', 
        description: 'Expected completion by Jan 13, 2024',
        icon: '✅',
        completed: false
      }
    ],
    updates: [
      { time: '2 hours ago', message: 'Field team dispatched to location' },
      { time: '4 hours ago', message: 'Required parts ordered from warehouse' },
      { time: '1 day ago', message: 'Initial assessment completed' }
    ]
  };

  const handleTrack = () => {
    if (!ticketId.trim()) {
      alert('Please enter a Ticket ID');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingData(mockTrackingData);
      setLoading(false);
    }, 1000);
  };

  const handleQuickTrack = (id) => {
    setTicketId(id);
    setTimeout(() => {
      setTrackingData(mockTrackingData);
    }, 500);
  };

  return (
    <div className="track-page">
      <div className="container">
        {/* Header Section */}
        <div className="track-header">
          <div className="section-badge">Track & Monitor</div>
          <h1 className="section-title">Track Your Grievance Status</h1>
          <p className="section-description">
            Enter your Ticket ID to monitor the progress of your complaint in real-time.
            Our system provides transparent updates at every stage.
          </p>
        </div>

        {/* Search Section */}
        <div className="track-search-section">
          <div className="search-container">
            <div className="search-input-group">
              <div className="input-icon">🔍</div>
              <input
                type="text"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                placeholder="Enter your Ticket ID (e.g., GRV12345678)"
                className="track-input"
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              />
              <button 
                onClick={handleTrack} 
                className="btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Tracking...
                  </>
                ) : (
                  'Track Status'
                )}
              </button>
            </div>
            
            <div className="quick-track-section">
              <p className="quick-track-label">Quick Track Recent Tickets:</p>
              <div className="quick-track-buttons">
                <button 
                  className="quick-track-btn"
                  onClick={() => handleQuickTrack('GRV202400123')}
                >
                  GRV202400123
                </button>
                <button 
                  className="quick-track-btn"
                  onClick={() => handleQuickTrack('GRV202400456')}
                >
                  GRV202400456
                </button>
                <button 
                  className="quick-track-btn"
                  onClick={() => handleQuickTrack('GRV202400789')}
                >
                  GRV202400789
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="tracking-results">
            {/* Complaint Summary Card */}
            <div className="summary-card">
              <div className="summary-header">
                <div>
                  <h3>Complaint Summary</h3>
                  <p className="ticket-id">Ticket ID: <strong>{trackingData.ticketId}</strong></p>
                </div>
                <div className="priority-badge high">
                  {trackingData.priority} Priority
                </div>
              </div>
              
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Complaint:</span>
                  <span className="summary-value">{trackingData.complaint}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Department:</span>
                  <span className="dept-tag">{trackingData.department}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Status:</span>
                  <span className={`status-badge ${trackingData.status}`}>
                    {trackingData.status}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Submitted:</span>
                  <span className="summary-value">{trackingData.submittedDate}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Assigned Officer:</span>
                  <span className="summary-value">{trackingData.assignedOfficer}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Estimated Resolution:</span>
                  <span className="summary-value highlight">{trackingData.estimatedResolution}</span>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="timeline-section">
              <h3>Complaint Timeline</h3>
              <p className="section-subtitle">Track your complaint's progress through each stage</p>
              
              <div className="timeline-container">
                {trackingData.timeline.map((stage, index) => (
                  <div 
                    key={stage.id} 
                    className={`timeline-step ${stage.completed ? 'completed' : ''} ${stage.current ? 'current' : ''}`}
                  >
                    <div className="step-marker">
                      <div className="marker-icon">{stage.icon}</div>
                      {index < trackingData.timeline.length - 1 && (
                        <div className="step-connector"></div>
                      )}
                    </div>
                    <div className="step-content">
                      <div className="step-header">
                        <h4>{stage.stage}</h4>
                        <span className="step-date">{stage.date}</span>
                      </div>
                      <p className="step-description">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Updates */}
            <div className="updates-section">
              <h3>Recent Updates</h3>
              <div className="updates-list">
                {trackingData.updates.map((update, index) => (
                  <div key={index} className="update-card">
                    <div className="update-time">{update.time}</div>
                    <div className="update-content">
                      <div className="update-message">{update.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="contact-section">
              <h3>Need Help?</h3>
              <div className="contact-grid">
                <div className="contact-card">
                  <div className="contact-icon">📞</div>
                  <div className="contact-info">
                    <div className="contact-label">Helpline</div>
                    <div className="contact-value">1800-XXX-XXXX</div>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon">📧</div>
                  <div className="contact-info">
                    <div className="contact-label">Email</div>
                    <div className="contact-value">{trackingData.officerContact}</div>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon">👤</div>
                  <div className="contact-info">
                    <div className="contact-label">Assigned Officer</div>
                    <div className="contact-value">{trackingData.assignedOfficer}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Tracking Data State */}
        {!trackingData && !loading && (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>Enter a Ticket ID to Track</h3>
            <p>Your ticket ID was provided when you submitted your complaint.</p>
            <div className="tips-card">
              <h4>Tracking Tips:</h4>
              <ul className="tips-list">
                <li>Ticket IDs start with "GRV" followed by numbers</li>
                <li>Check your email for the confirmation message</li>
                <li>You can use the quick track buttons for demo</li>
                <li>For lost tickets, contact our helpline</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackComplaint;