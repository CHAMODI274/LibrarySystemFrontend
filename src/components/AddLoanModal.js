import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function AddLoanModal({
  show,
  onHide,
  onClose, // alias support
  onSave,
  books = [],      // array of { id, title }
  users = []       // array of { id, name }
}) {

    const close = () => {
    if (typeof onHide === 'function') onHide();
    else if (typeof onClose === 'function') onClose();
  };

  // helper to format date YYYY-MM-DD
  const formatDate = (d) => {
    const dt = new Date(d);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // defaults
  const today = formatDate(new Date());
  const defaultDue = formatDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)); // +14 days

  const [bookId, setBookId] = useState(books[0]?.id ?? '');
  const [memberId, setMemberId] = useState(users[0]?.id ?? '');
  const [loanDate, setLoanDate] = useState(today);
  const [dueDate, setDueDate] = useState(defaultDue);
  const [returnDate, setReturnDate] = useState(''); // optional
  const [status, setStatus] = useState('Active'); // Active / Returned / Overdue
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) {
      setBookId(books[0]?.id ?? '');
      setMemberId(users[0]?.id ?? '');
      setLoanDate(today);
      setDueDate(defaultDue);
      setReturnDate('');
      setStatus('Active');
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const validate = () => {
    const e = {};
    if (!bookId) e.bookId = 'Book is required';
    if (!memberId) e.memberId = 'Member is required';
    if (!loanDate) e.loanDate = 'Loan date is required';
    if (!dueDate) e.dueDate = 'Due date is required';
    // ensure dueDate >= loanDate
    if (loanDate && dueDate && new Date(dueDate) < new Date(loanDate)) {
      e.dueDate = 'Due date cannot be before loan date';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newLoan = {
      id: Date.now(),
      bookId: typeof bookId === 'string' ? parseInt(bookId, 10) : bookId,
      memberId: typeof memberId === 'string' ? parseInt(memberId, 10) : memberId,
      loanDate,
      dueDate,
      returnDate: returnDate || null,
      status
    };

    if (typeof onSave === 'function') onSave(newLoan);
    close();
  };


  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Loan</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loanBook">
            <Form.Label>Book</Form.Label>
            <Form.Select
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              isInvalid={!!errors.bookId}
              required
            >
              <option value="">Select book</option>
              {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.bookId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="loanMember">
            <Form.Label>Member</Form.Label>
            <Form.Select
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              isInvalid={!!errors.memberId}
              required
            >
              <option value="">Select member</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.memberId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="loanDate">
            <Form.Label>Loan Date</Form.Label>
            <Form.Control
              type="date"
              value={loanDate}
              onChange={(e) => setLoanDate(e.target.value)}
              isInvalid={!!errors.loanDate}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.loanDate}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              isInvalid={!!errors.dueDate}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.dueDate}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="returnDate">
            <Form.Label>Return Date (optional)</Form.Label>
            <Form.Control
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loanStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Active</option>
              <option>Returned</option>
              <option>Overdue</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={close} className="me-2">Cancel</Button>
            <Button variant="success" type="submit">Add Loan</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
