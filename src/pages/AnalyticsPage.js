import React from 'react';
import './Pages.css';

const AnalyticsPage = () => {
  return (
    <div className="page">
      <h2 className="page-title">Analytics</h2>
      
      <div className="card">
        <h3>Performance Metrics</h3>
        <div className="chart-placeholder">Chart Placeholder</div>
      </div>
      
      <div className="grid grid-2">
        <div className="card">
          <h3>Traffic Sources</h3>
          <div className="chart-placeholder">Pie Chart Placeholder</div>
        </div>
        
        <div className="card">
          <h3>User Growth</h3>
          <div className="chart-placeholder">Line Chart Placeholder</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;