import React, { useState, useContext } from "react";
import { ApiContext } from "../App";
import "../styles/App.css";

/* =========================
   Timeline configuration
========================= */
const TIMELINE_STEPS = [
  { key: "Submitted", icon: "📝", description: "Complaint received via portal" },
  { key: "AI Analysis", icon: "🤖", description: "AI analyzed and routed complaint" },
  { key: "Assigned", icon: "👤", description: "Assigned to department" },
  { key: "In Progress", icon: "🛠️", description: "Work in progress" },
  { key: "Resolved", icon: "✅", description: "Complaint resolved" }
];

const STATUS_ORDER = {
  "Pending": 1,
  "In Progress": 4,
  "Resolved": 5
};

/* =========================
   Helper functions
========================= */
const buildTimeline = (status, createdAt) => {
  const completedIndex = STATUS_ORDER[status] || 1;

  return TIMELINE_STEPS.map((step, index) => ({
    ...step,
    completed: index < completedIndex,
    current: index + 1 === completedIndex,
    date:
      index === 0 && createdAt?.seconds
        ? new Date(createdAt.seconds * 1000).toLocaleString()
        : ""
  }));
};

const buildUpdates = (status) => {
  if (status === "Pending") {
    return [{ time: "Just now", message: "Complaint registered successfully" }];
  }
  if (status === "In Progress") {
    return [
      { time: "Today", message: "Assigned to department" },
      { time: "Earlier", message: "Repair work initiated" }
    ];
  }
  if (status === "Resolved") {
    return [{ time: "Completed", message: "Issue resolved successfully" }];
  }
  return [];
};

/* =========================
   Component
========================= */
const TrackComplaint = () => {
  const { apiRequest } = useContext(ApiContext);

  const [ticketId, setTicketId] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!ticketId.trim()) {
      setError("Please enter a Ticket ID");
      return;
    }

    setLoading(true);
    setError("");
    setTrackingData(null);

    try {
      const cleanTicketId = ticketId.trim();
      const data = await apiRequest(`/grievance/track/${cleanTicketId}`, {
        method: "GET"
      });

      if (data.error) {
        setError("Ticket not found. Please check the Ticket ID.");
      } else {
        const adaptedData = {
          ticketId: cleanTicketId,
          complaint: data.text,
          department: data.department,
          priority: data.priority,
          status: data.status,
          submittedDate: data.created_at?.seconds
            ? new Date(data.created_at.seconds * 1000).toLocaleString()
            : "N/A",
          timeline: buildTimeline(data.status, data.created_at),
          updates: buildUpdates(data.status)
        };

        setTrackingData(adaptedData);
      }
    } catch (err) {
      setError("Failed to fetch grievance details");
    }

    setLoading(false);
  };

  return (
    <div className="track-page">
      <div className="container">

        {/* Header */}
        <div className="track-header">
          <h1>Track Your Grievance Status</h1>
          <p>Enter your Ticket ID to monitor the progress of your complaint.</p>
        </div>

        {/* Search */}
        <div className="track-search-section">
  <div className="search-container">
    <div className="search-input-group">
      <input
        type="text"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
        placeholder="Enter your Ticket ID"
        className="track-input"
      />

      <button
        onClick={handleTrack}
        disabled={loading}
        className="btn-primary"
      >
        {loading ? "Tracking..." : "Track Status"}
      </button>
    </div>
  </div>
</div>

        {/* Error */}
        {error && <div className="error-box">{error}</div>}

        {/* Results */}
        {trackingData && (
          <div className="tracking-results">

            {/* Summary */}
            <div className="summary-card">
              <h2>Complaint Summary</h2>
              <h4 style={{ marginBottom: "0.75rem", marginTop: "1rem" }}><strong>Ticket ID:</strong> {trackingData.ticketId}</h4>
              <h4 style={{ marginBottom: "0.75rem", marginTop: "1rem" }}><strong>Complaint:</strong> {trackingData.complaint}</h4>
              <h4 style={{ marginBottom: "0.75rem", marginTop: "1rem" }}><strong>Department:</strong> {trackingData.department}</h4>
              <h4 style={{ marginBottom: "0.75rem", marginTop: "1rem" }}><strong>Status:</strong> {trackingData.status}</h4>
              <h4 style={{ marginBottom: "0.75rem", marginTop: "1rem" }}><strong>Priority:</strong> {trackingData.priority}</h4>
              <h4 style={{ marginBottom: "0.75rem", marginTop: "1rem" }}><strong>Submitted:</strong> {trackingData.submittedDate}</h4>
            </div>

            {/* Timeline */}
            <div className="timeline-section">
              <h3 style={{ marginBottom: "1.5rem" }} >Complaint Timeline</h3>
              <div className="timeline-container">
                {trackingData.timeline.map((step, index) => (
                  <div
                    key={index}
                    className={`timeline-step ${step.completed ? "completed" : ""} ${step.current ? "current" : ""}`}
                  >
                    <div className="timeline-icon">{step.icon}</div>
                    <div className="timeline-content">
                      <h4>{step.key}</h4>
                      <p>{step.description}</p>
                      {step.date && <span className="timeline-date">{step.date}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Updates */}
            <div className="updates-section">
              <h3>Recent Updates</h3>
              {trackingData.updates.map((update, idx) => (
                <div key={idx} className="update-card">
                  <span className="update-time">{update.time}</span>
                  <p>{update.message}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Empty State */}
        {!trackingData && !loading && !error && (
          <div className="empty-state">
            <h3>Enter a Ticket ID to Track</h3>
            <p>Your ticket ID was provided when you submitted the grievance.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrackComplaint;