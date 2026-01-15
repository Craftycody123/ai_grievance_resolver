import React from 'react';
import Analytics from './Analytics';
import '../styles/components.css';

const Dashboard = ({ stats }) => {
  return (
    <div className="dashboard">
      <h2>Grievance Analytics Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Complaints</h3>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-change">+12% from last month</div>
        </div>
        
        <div className="stat-card resolved">
          <h3>Resolved</h3>
          <div className="stat-value">{stats.resolved}</div>
          <div className="stat-change">{((stats.resolved / stats.total) * 100).toFixed(1)}% resolution rate</div>
        </div>
        
        <div className="stat-card pending">
          <h3>In Progress</h3>
          <div className="stat-value">{stats.inProgress}</div>
          <div className="stat-change">Avg: 3.2 days to resolve</div>
        </div>
        
        <div className="stat-card escalated">
          <h3>Escalated</h3>
          <div className="stat-value">{stats.escalated}</div>
          <div className="stat-change">Requiring higher attention</div>
        </div>
      </div>
      
      <Analytics data={stats.analytics} />
      
      <div className="department-performance">
        <h3>Department Performance</h3>
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
              <span className="dept-rate">{dept.resolutionRate}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;