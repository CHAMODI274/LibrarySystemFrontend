import React from 'react'
import SideNavbar from '../components/SideNavbar';
import './Dashboard.css';
import bookIcon from '../assets/bookIcon.png';
import userIcon from '../assets/userIcon.png';
import loanIcon from '../assets/loanIcon.png';
import overdueIcon from '../assets/overdueIcon.png';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <SideNavbar />

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <p>Empowering Library Management – Streamline Operations and Enhance User Experience</p>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <img src={bookIcon} alt="Total Books" className="stat-icon" />
            <div>
              <h4>Total Books</h4>
              <p className="stat-number">12,847</p>
            </div>
          </div>

          <div className="stat-box">
            <img src={userIcon} alt="Users" className="stat-icon" />
            <div>
              <h4>Users</h4>
              <p className="stat-number">3,421</p>
            </div>
          </div>

          <div className="stat-box">
            <img src={loanIcon} alt="Current Loans" className="stat-icon" />
            <div>
              <h4>Current Loans</h4>
              <p className="stat-number">1,892</p>
            </div>
          </div>

          <div className="stat-box">
            <img src={overdueIcon} alt="Overdue Items" className="stat-icon" />
            <div>
              <h4>Overdue Items</h4>
              <p className="stat-number">47</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
