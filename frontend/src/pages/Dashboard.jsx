import React from 'react';
import Analytics from '../components/Analytics';
import '../styles/components.css';

const Dashboard = () => {
  // Dashboard statistics
  const stats = {
    total: 156,
    resolved: 124,
    inProgress: 28,
    escalated: 4,
    pending: 12,
    averageResolutionTime: '2.3 days'
  };

  // Department performance data
  const departmentPerformance = [
    { name: 'Water Supply', resolutionRate: 85, avgTime: '1.8 days', totalComplaints: 45 },
    { name: 'Electricity', resolutionRate: 92, avgTime: '1.5 days', totalComplaints: 38 },
    { name: 'Sanitation', resolutionRate: 78, avgTime: '2.8 days', totalComplaints: 32 },
    { name: 'Roads', resolutionRate: 65, avgTime: '4.2 days', totalComplaints: 28 },
    { name: 'Healthcare', resolutionRate: 88, avgTime: '1.9 days', totalComplaints: 25 },
    { name: 'Education', resolutionRate: 72, avgTime: '3.1 days', totalComplaints: 18 }
  ];

  // Recent activities
  const recentActivities = [
    { id: 1, action: 'New complaint submitted', department: 'Water Supply', time: '10 mins ago', priority: 'High' },
    { id: 2, action: 'Complaint resolved', department: 'Electricity', time: '25 mins ago', priority: 'Medium' },
    { id: 3, action: 'Complaint escalated', department: 'Roads', time: '1 hour ago', priority: 'High' },
    { id: 4, action: 'New officer assigned', department: 'Sanitation', time: '2 hours ago', priority: 'Medium' },
    { id: 5, action: 'System update completed', department: 'System', time: '3 hours ago', priority: 'Low' }
  ];

  // Analytics data
  const analyticsData = {
    complaintTrends: [
      { month: 'Jan', count: 120 },
      { month: 'Feb', count: 145 },
      { month: 'Mar', count: 132 },
      { month: 'Apr', count: 168 },
      { month: 'May', count: 156 },
      { month: 'Jun', count: 189 }
    ],
    resolutionTimes: [
      { department: 'Water Supply', avgDays: 1.8 },
      { department: 'Electricity', avgDays: 1.5 },
      { department: 'Sanitation', avgDays: 2.8 },
      { department: 'Roads', avgDays: 4.2 },
      { department: 'Healthcare', avgDays: 1.9 },
      { department: 'Education', avgDays: 3.1 }
    ],
    topCategories: [
      { category: 'Infrastructure', count: 45, trend: '+12%' },
      { category: 'Utilities', count: 38, trend: '+5%' },
      { category: 'Sanitation', count: 32, trend: '+8%' },
      { category: 'Public Safety', count: 28, trend: '+15%' },
      { category: 'Administrative', count: 15, trend: '-3%' }
    ],
    sentimentAnalysis: {
      positive: 35,
      neutral: 45,
      negative: 20
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Grievance Analytics Dashboard</h1>
        <p className="dashboard-subtitle">Monitor complaint patterns, departmental performance, and resolution efficiency in real-time</p>
        
        <div className="dashboard-filters">
          <select className="filter-select">
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
          <select className="filter-select">
            <option value="all">All Departments</option>
            <option value="water">Water Supply</option>
            <option value="electricity">Electricity</option>
            <option value="sanitation">Sanitation</option>
            <option value="roads">Roads</option>
          </select>
          <button className="export-btn">
            <span className="export-icon">📊</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="stats-grid">
        <div className="stat-card total-complaints">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>Total Complaints</h3>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-trend positive">+12% from last month</div>
          </div>
        </div>
        
        <div className="stat-card resolved-complaints">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Resolved</h3>
            <div className="stat-value">{stats.resolved}</div>
            <div className="stat-trend positive">{((stats.resolved / stats.total) * 100).toFixed(1)}% resolution rate</div>
          </div>
        </div>
        
        <div className="stat-card inprogress-complaints">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <h3>In Progress</h3>
            <div className="stat-value">{stats.inProgress}</div>
            <div className="stat-trend neutral">Avg: {stats.averageResolutionTime}</div>
          </div>
        </div>
        
        <div className="stat-card escalated-complaints">
          <div className="stat-icon">🚨</div>
          <div className="stat-content">
            <h3>Escalated</h3>
            <div className="stat-value">{stats.escalated}</div>
            <div className="stat-trend negative">Requiring higher attention</div>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <Analytics data={analyticsData} />

      {/* Department Performance */}
      <div className="department-section">
        <div className="section-header">
          <h3>Department Performance</h3>
          <span className="section-subtitle">Resolution rates and average handling times</span>
        </div>
        
        <div className="department-grid">
          {departmentPerformance.map((dept, idx) => (
            <div key={idx} className="department-card">
              <div className="dept-header">
                <h4>{dept.name}</h4>
                <span className={`dept-status ${dept.resolutionRate >= 85 ? 'good' : dept.resolutionRate >= 70 ? 'average' : 'poor'}`}>
                  {dept.resolutionRate}%
                </span>
              </div>
              
              <div className="dept-stats">
                <div className="dept-stat">
                  <span className="stat-label">Resolution Rate</span>
                  <div className="progress-container">
                    <div 
                      className={`progress-bar ${dept.resolutionRate >= 85 ? 'good' : dept.resolutionRate >= 70 ? 'average' : 'poor'}`}
                      style={{ width: `${dept.resolutionRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="dept-stat">
                  <span className="stat-label">Avg. Resolution Time</span>
                  <span className="stat-value">{dept.avgTime}</span>
                </div>
                
                <div className="dept-stat">
                  <span className="stat-label">Total Complaints</span>
                  <span className="stat-value">{dept.totalComplaints}</span>
                </div>
              </div>
              
              <div className="dept-footer">
                <button className="dept-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="activities-section">
        <div className="section-header">
          <h3>Recent Activities</h3>
          <span className="section-subtitle">Latest updates in the system</span>
        </div>
        
        <div className="activities-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.action.includes('resolved') ? '✅' : 
                 activity.action.includes('escalated') ? '🚨' : 
                 activity.action.includes('assigned') ? '👤' : '📝'}
              </div>
              <div className="activity-content">
                <div className="activity-action">{activity.action}</div>
                <div className="activity-meta">
                  <span className="activity-dept">{activity.department}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
              <div className={`activity-priority ${activity.priority.toLowerCase()}`}>
                {activity.priority}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="ai-insights">
        <div className="section-header">
          <h3>AI Insights & Recommendations</h3>
          <span className="section-subtitle">Based on analysis of current data patterns</span>
        </div>
        
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">🎯</div>
            <h4>High Priority Alert</h4>
            <p>Roads department has 3 complaints pending for over 5 days. Consider escalation.</p>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon">📈</div>
            <h4>Trend Analysis</h4>
            <p>Water supply complaints increased by 25% this week in Sector 7. Check for systemic issues.</p>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon">🤝</div>
            <h4>Resource Allocation</h4>
            <p>Sanitation department needs 2 additional field officers based on current workload.</p>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon">⏱️</div>
            <h4>Efficiency Tip</h4>
            <p>Electricity department resolves complaints 40% faster than average. Share best practices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;