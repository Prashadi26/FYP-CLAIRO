import React from 'react';
import './Pages.css';

const HomePage = () => {
  return (
    <div className="page">
      <h2 className="page-title">Home</h2>
      
      <div className="grid grid-3">
        <div className="card">
          <h3>Welcome</h3>
          <p>Welcome to your dashboard. Here you can manage all aspects of your application.</p>
        </div>
        
        <div className="card">
          <h3>Summary</h3>
          <p>Quick overview of your system status and important metrics.</p>
        </div>
        
        <div className="card">
          <h3>Recent Activity</h3>
          <p>View the most recent actions and changes in your system.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;