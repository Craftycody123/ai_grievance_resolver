import React from 'react';
import '../styles/components.css';

const Analytics = ({ data = {} }) => {
  // Default data if none provided
  const analyticsData = {
    complaintTrends: data.complaintTrends || [
      { month: 'Jan', count: 120 },
      { month: 'Feb', count: 145 },
      { month: 'Mar', count: 132 },
      { month: 'Apr', count: 168 },
      { month: 'May', count: 156 },
      { month: 'Jun', count: 189 }
    ],
    resolutionTimes: data.resolutionTimes || [
      { department: 'Water Supply', avgDays: 2.5 },
      { department: 'Electricity', avgDays: 1.8 },
      { department: 'Sanitation', avgDays: 3.2 },
      { department: 'Roads', avgDays: 4.5 },
      { department: 'Healthcare', avgDays: 2.1 }
    ],
    topCategories: data.topCategories || [
      { category: 'Infrastructure', count: 45 },
      { category: 'Utilities', count: 38 },
      { category: 'Sanitation', count: 32 },
      { category: 'Public Safety', count: 28 },
      { category: 'Administrative', count: 15 }
    ],
    sentimentAnalysis: data.sentimentAnalysis || {
      positive: 25,
      neutral: 45,
      negative: 30
    }
  };

  return (
    <div className="analytics-container">
      <h3>Detailed Analytics</h3>
      
      <div className="analytics-grid">
        {/* Complaint Trends Chart */}
        <div className="analytics-card">
          <h4>Complaint Trends</h4>
          <div className="trend-chart">
            {analyticsData.complaintTrends.map((trend, index) => {
              const height = (trend.count / 200) * 100;
              return (
                <div key={index} className="chart-bar">
                  <div 
                    className="bar-fill" 
                    style={{ height: `${height}%` }}
                    title={`${trend.count} complaints`}
                  ></div>
                  <span className="bar-label">{trend.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resolution Times */}
        <div className="analytics-card">
          <h4>Average Resolution Time (Days)</h4>
          <div className="resolution-list">
            {analyticsData.resolutionTimes.map((item, index) => (
              <div key={index} className="resolution-item">
                <span className="dept-name">{item.department}</span>
                <div className="time-bar">
                  <div 
                    className="time-fill" 
                    style={{ width: `${(item.avgDays / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="time-value">{item.avgDays} days</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="analytics-card">
          <h4>Top Complaint Categories</h4>
          <div className="categories-list">
            {analyticsData.topCategories.map((category, index) => (
              <div key={index} className="category-item">
                <span className="category-name">{category.category}</span>
                <div className="category-bar">
                  <div 
                    className="category-fill" 
                    style={{ width: `${(category.count / 50) * 100}%` }}
                  ></div>
                </div>
                <span className="category-count">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="analytics-card">
          <h4>Sentiment Analysis</h4>
          <div className="sentiment-chart">
            <div className="sentiment-item positive">
              <div className="sentiment-label">Positive</div>
              <div className="sentiment-bar">
                <div 
                  className="sentiment-fill" 
                  style={{ width: `${analyticsData.sentimentAnalysis.positive}%` }}
                ></div>
              </div>
              <div className="sentiment-value">{analyticsData.sentimentAnalysis.positive}%</div>
            </div>
            <div className="sentiment-item neutral">
              <div className="sentiment-label">Neutral</div>
              <div className="sentiment-bar">
                <div 
                  className="sentiment-fill" 
                  style={{ width: `${analyticsData.sentimentAnalysis.neutral}%` }}
                ></div>
              </div>
              <div className="sentiment-value">{analyticsData.sentimentAnalysis.neutral}%</div>
            </div>
            <div className="sentiment-item negative">
              <div className="sentiment-label">Negative</div>
              <div className="sentiment-bar">
                <div 
                  className="sentiment-fill" 
                  style={{ width: `${analyticsData.sentimentAnalysis.negative}%` }}
                ></div>
              </div>
              <div className="sentiment-value">{analyticsData.sentimentAnalysis.negative}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;