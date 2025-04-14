import React from 'react';
import './Pages.css';

const UsersPage = () => {
  return (
    <div className="page">
      <h2 className="page-title">Users</h2>
      
      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>john@example.com</td>
                <td>Admin</td>
                <td><span className="badge badge-success">Active</span></td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>jane@example.com</td>
                <td>Editor</td>
                <td><span className="badge badge-success">Active</span></td>
              </tr>
              <tr>
                <td>Mike Johnson</td>
                <td>mike@example.com</td>
                <td>User</td>
                <td><span className="badge badge-secondary">Inactive</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;