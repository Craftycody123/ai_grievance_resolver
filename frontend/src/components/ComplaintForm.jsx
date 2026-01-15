import React, { useState, useContext } from "react";
import { ApiContext } from "../App";
import { AuthContext } from "../context/AuthContext";

const ComplaintForm = ({ onSubmit }) => {
  const { apiRequest } = useContext(ApiContext);
  const { profile } = useContext(AuthContext);

  const [complaint, setComplaint] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!complaint.trim()) return;

    setLoading(true);
    setError("");

    try {
      // REAL backend call
      const data = await apiRequest("/grievance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: complaint,
          user: profile?.email || "anonymous"
        })
      });

      // Pass backend response up to SubmitComplaint.jsx
      onSubmit(data);

      setComplaint("");
    } catch (err) {
      setError("Failed to submit grievance. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}
    >
      <h1>Submit Your Grievance</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1.5rem" }}>
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Describe your issue in natural language..."
            style={{
              width: "100%",
              padding: "1rem",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontFamily: "inherit",
              fontSize: "1rem"
            }}
            rows="6"
            required
          />
        </div>

        {error && (
          <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "1rem 2rem",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "600",
            width: "100%",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Submitting..." : "Submit Grievance"}
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
