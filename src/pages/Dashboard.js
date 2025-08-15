import React from 'react'
import SideNavbar from '../components/SideNavbar';
import StatCard from '../components/StatCard';
import Button from 'react-bootstrap/Button';
import './Dashboard.css'; 

export default function Dashboard() {

// sample data (replace with real data)
  const books = [
    { id: 1 },{ id: 2 },{ id: 3 },{ id: 4 },{ id: 5 },{ id: 6 },{ id: 7 },{ id: 8 },{ id: 9 },{ id: 10 }
  ];
  const users = [{ id: 1 },{ id: 2 },{ id: 3 },{ id: 4 }];
  const loans = [
    { id: 1, status: 'Active', dueDate: '2025-08-15' },
    { id: 2, status: 'Returned', dueDate: '2025-07-24' },
    { id: 3, status: 'Overdue', dueDate: '2025-08-05' },
    { id: 4, status: 'Active', dueDate: '2025-08-20' }
  ];

  const currentDate = new Date('2025-08-15');
  const totalBooks = books.length;
  const totalUsers = users.length;
  const currentLoans = loans.filter(l => l.status === 'Active').length;
  const overdueItems = loans.filter(l => l.status !== 'Returned' && new Date(l.dueDate) < currentDate).length;

  // simple inline SVG icons (you can swap with svg files or icon library)
  const BookIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M3 6.5C3 5.67157 3.67157 5 4.5 5h13c.8284 0 1.5.6716 1.5 1.5V19a1 1 0 0 1-1 1H6c-.5523 0-1-.4477-1-1V6.5z" stroke="#0b5cff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 5v14" stroke="#0b5cff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const UserIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M20 21v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" stroke="#0b8a5f" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="7" r="4" stroke="#0b8a5f" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const LoanIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="3" y="4" width="18" height="6" rx="2" stroke="#ff8c00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 14h10M7 18h6" stroke="#ff8c00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const OverdueIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="#ff3b30" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8v5" stroke="#ff3b30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 16h.01" stroke="#ff3b30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );


  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar />

      <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1>Dashboard</h1>
            <p className="text-muted">Quick summary of library stats</p>
          </div>
          <Button variant="secondary">Refresh</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <StatCard title="Total Books" count={totalBooks} subtitle={`${totalBooks} books in the catalog`} icon={BookIcon} />
          <StatCard title="Total Users" count={totalUsers} subtitle={`${totalUsers} registered users`} icon={UserIcon} />
          <StatCard title="Current Loans" count={currentLoans} subtitle={`${currentLoans} active loans`} icon={LoanIcon} />
          <StatCard title="Overdue Items" count={overdueItems} subtitle={`${overdueItems} overdue loans`} icon={OverdueIcon} />
        </div>
      </div>
    </div>
  );
}
