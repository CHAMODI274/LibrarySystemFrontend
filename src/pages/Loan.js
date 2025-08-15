import React from 'react';
import SideNavbar from '../components/SideNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import LoanCard from '../components/LoanCard';

export default function Loan() {

  // Sample loan data
  const loans = [
    {
      id: 1,
      borrowerName: 'John Doe',
      bookTitle: 'Atomic Habits',
      loanDate: '2025-08-01',
      returnDate: '2025-08-15',
      status: 'Active'
    },
    {
      id: 2,
      borrowerName: 'Jane Smith',
      bookTitle: 'Sapiens',
      loanDate: '2025-07-10',
      returnDate: '2025-07-24',
      status: 'Returned'
    }
  ];


  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar />

      <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
        
        {/* Page Heading */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1>Loan Management</h1>
            <p className="text-muted">
              Track and manage all loaned books efficiently.
            </p>
          </div>
          <Button variant="success" className="px-4">
            Create Loan
          </Button>
        </div>

        {/* Search and Loan Status Filter */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search loans by Loan ID or Borrower..."
            />
          </InputGroup>

          <DropdownButton
            id="dropdown-loan-status"
            title="All Status"
            variant="outline-secondary"
          >
            <Dropdown.Item>All Status</Dropdown.Item>
            <Dropdown.Item>Active</Dropdown.Item>
            <Dropdown.Item>Returned</Dropdown.Item>
            <Dropdown.Item>Overdue</Dropdown.Item>
          </DropdownButton>
        </div>

        {/* Loan Cards */}
        <div className="d-flex flex-wrap gap-3">
          {loans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      </div>
    </div>
  );
}
