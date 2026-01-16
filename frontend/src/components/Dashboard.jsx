import React from "react";
import Analytics from "./Analytics";
import "../styles/components.css";

const Dashboard = ({ stats }) => {
  if (!stats) return null;

  const resolutionRate =
    stats.total > 0
      ? ((stats.resolved / stats.total) * 100).toFixed(1)
      : 0;

  return (
    <div className="dashboard">
      <h1 style={{ marginBottom: "2.5rem", marginTop: "1.5rem", textAlign:"center" }}>Grievance Analytics Dashboard</h1>

      {/* =====================
          SUMMARY STATS
      ====================== */}
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Complaints</h3>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-change">Live data</div>
        </div>

        <div className="stat-card resolved">
          <h3>Resolved</h3>
          <div className="stat-value">{stats.resolved}</div>
          <div className="stat-change">{resolutionRate}% resolution rate</div>
        </div>

        <div className="stat-card pending">
          <h3>In Progress</h3>
          <div className="stat-value">{stats.inProgress}</div>
          <div className="stat-change">Currently active</div>
        </div>

        <div className="stat-card escalated">
          <h3>Escalated</h3>
          <div className="stat-value">{stats.escalated}</div>
          <div className="stat-change">High priority unresolved</div>
        </div>
      </div>

      {/* =====================
          ANALYTICS
      ====================== */}
      <Analytics data={stats.analytics} />

      {/* =====================
          DEPARTMENT PERFORMANCE
      ====================== */}
      <div className="department-performance">
        <h2>Department Performance</h2>

        <div className="dept-list">
          {stats.departmentPerformance.map((dept, idx) => (
            <div key={idx} className="dept-item">
              <span className="dept-name">{dept.name}</span>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${dept.resolutionRate}%` }}
                ></div>
              </div>

              <span className="dept-rate">
                {dept.resolutionRate}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* =====================
          RECENT ACTIVITIES
      ====================== */}
      <div className="activities-section">
        <h3>Recent Activities</h3>

        <div className="activities-list">
          {stats.recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.action.includes("resolved")
                  ? "✅"
                  : activity.action.includes("progress")
                  ? "🔄"
                  : "📝"}
              </div>

              <div className="activity-content">
                <div className="activity-action">
                  {activity.action}
                </div>
                <div className="activity-meta">
                  <span>{activity.department}</span>
                  <span>{activity.time}</span>
                </div>
              </div>

              <div
                className={`activity-priority ${activity.priority.toLowerCase()}`}
              >
                {activity.priority}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
