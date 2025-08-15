import React, { useMemo, useState } from 'react';
import SideNavbar from '../components/SideNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import LoanCard from '../components/LoanCard';
import AddLoanModal from '../components/AddLoanModal';

export default function Loan() {

  // Sample books (id + title) used in the modal
  const books = [
    { id: 1, title: 'Atomic Habits' },
    { id: 2, title: 'Sapiens' },
    { id: 3, title: 'The Alchemist' },
    { id: 4, title: 'Thinking, Fast and Slow' }
  ];

  // Sample users (members)
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Sam Green' }
  ];

  // initial loans (store bookId/memberId; expand below)
  const initialLoans = [
    { id: 1, bookId: 1, memberId: 1, loanDate: '2025-08-01', dueDate: '2025-08-15', returnDate: null, status: 'Active' },
    { id: 2, bookId: 2, memberId: 2, loanDate: '2025-07-10', dueDate: '2025-07-24', returnDate: '2025-07-20', status: 'Returned' }
  ];

  const [loans, setLoans] = useState(initialLoans);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Status');

  // handle save from modal
  const handleAddLoan = (newLoan) => {
    setLoans(prev => [...prev, newLoan]);
    setShowAdd(false);
  };

  // expand loans for display (include bookTitle and borrowerName)
  const expandedLoans = useMemo(() => {
    return loans.map(l => {
      const book = books.find(b => b.id === l.bookId) ?? { title: '' };
      const user = users.find(u => u.id === l.memberId) ?? { name: '' };
      return {
        ...l,
        bookTitle: book.title,
        borrowerName: user.name
      };
    });
  }, [loans, books, users]);

  // optional: apply search & status filter
  const visibleLoans = expandedLoans.filter(l => {
    if (filterStatus && filterStatus !== 'All Status' && l.status !== filterStatus) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return String(l.id).includes(q) || l.bookTitle.toLowerCase().includes(q) || l.borrowerName.toLowerCase().includes(q);
  });


  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar />

      <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
        {/* Page Heading and Action Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1>Loan Management</h1>
            <p className="text-muted">Search and manage book loans</p>
          </div>
          <Button variant="success" className="px-4" onClick={() => setShowAdd(true)}>Add New Loan</Button>
        </div>

        {/* Search Bar + Status Dropdown */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup style={{ flex: '1' }}>
            <Form.Control
              type="text"
              placeholder="Search loans by Book Title or Member ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>

          <DropdownButton
            id="dropdown-loan-status"
            title={filterStatus}
            variant="outline-secondary"
          >
            <Dropdown.Item onClick={() => setFilterStatus('All Status')}>All Status</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterStatus('Active')}>Active</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterStatus('Returned')}>Returned</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterStatus('Overdue')}>Overdue</Dropdown.Item>
          </DropdownButton>
        </div>

        {/* Loan Cards */}
        <div className="d-flex flex-wrap gap-3">
          {visibleLoans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      </div>

      {/* Add Loan Modal */}
      <AddLoanModal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onSave={handleAddLoan}
        books={books}
        users={users}
      />
    </div>
  );
}
