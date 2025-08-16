import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './LoanCard.css'; 

export default function LoanCard({ loan, onEdit, onDelete }) { 
  const handleEdit = () => {
    if (onEdit) onEdit(loan)
  }

  const handleDelete = () => {
    if (onDelete) onDelete(loan.id)
  }

  const getStatusBadge = (status) => {
    const badgeClass =
      status === "Active"
        ? "bg-success"
        : status === "Returned"
          ? "bg-primary"
          : status === "Overdue"
            ? "bg-danger"
            : "bg-secondary"
    return <span className={`badge ${badgeClass}`}>{status}</span>
  }

  return (
    <Card className="loan-card">
      <Card.Body>
        <Card.Title className="loan-card-title">Loan ID: {loan.id}</Card.Title>
        <Card.Subtitle className="loan-card-subtitle mb-2">Borrower: {loan.borrowerName}</Card.Subtitle>

        <Card.Text className="loan-card-text">
          <strong>Book:</strong> {loan.bookTitle} <br />
          {loan.bookAuthor && (
            <>
              <strong>Author:</strong> {loan.bookAuthor} <br />
            </>
          )}
          <strong>Loan Date:</strong> {loan.loanDate} <br />
          <strong>Due Date:</strong> {loan.dueDate} <br />
          {loan.returnDate && (
            <>
              <strong>Return Date:</strong> {loan.returnDate} <br />
            </>
          )}
          <strong>Status:</strong> {getStatusBadge(loan.status)}
        </Card.Text>

        <div className="loan-card-buttons">
          <Button variant="outline-secondary" className="me-2 edit-btn" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="danger" className="delete-btn" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
