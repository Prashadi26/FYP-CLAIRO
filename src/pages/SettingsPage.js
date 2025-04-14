import React from 'react';
import './Pages.css';

const SettingsPage = () => {
  return (
    <div className="page">
      <h2 className="page-title">Settings</h2>
      
      <div className="card">
        <h3>Account Settings</h3>
        <form className="settings-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" defaultValue="User Name" />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" defaultValue="user@example.com" />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" defaultValue="********" />
          </div>
          
          <button type="submit" className="btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;