import React, { useState, useContext } from "react";
import ComplaintForm from "../components/ComplaintForm";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SubmitComplaint = () => {
  const { user, profile, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  // If auth state is still loading, don't render yet
  if (loading) {
    return <p>Loading...</p>;
  }

  // If user not logged in, redirect to login
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = (data) => {
    // data comes from backend response
    setResult({
      ticketId: data.ticket_id,
      department: data.predicted_department
    });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      
      {/* User Info */}
      {profile && (
        <div style={{ marginBottom: "1rem", color: "#555" }}>
          Submitting as <strong>{profile.email}</strong>
        </div>
      )}

      <ComplaintForm onSubmit={handleSubmit} />

      {result && (
        <div
          style={{
            marginTop: "3rem",
            padding: "2rem",
            borderRadius: "8px",
            background: "whitesmoke",
            border: "1px solid var(beige-light)",
            marginBottom: "3rem"            
          }}
        >
          <h2>Complaint Submitted Successfully 🎉</h2>

          <p style={{ marginBottom: "0.75rem", marginTop: "1rem" }}>
            <strong>Ticket ID:</strong> {result.ticketId}
          </p>

          <p  style={{ marginBottom: "0.75rem" }}>
            <strong>Assigned Department:</strong> {result.department}
          </p>

          <p style={{ fontSize: "1rem", color: "#555", marginTop: "1rem"  }}>
            Please save your Ticket ID to track the status of your complaint.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubmitComplaint;
