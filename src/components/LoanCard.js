import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './LoanCard.css'; 

export default function LoanCard({ loan }) { 
  return (
    <Card className="loan-card">
      <Card.Body>
        <Card.Title className="loan-card-title">Loan ID: {loan.id}</Card.Title>
        <Card.Subtitle className="loan-card-subtitle mb-2">
          Borrower: {loan.borrowerName}
        </Card.Subtitle>

        <Card.Text className="loan-card-text">
          <strong>Book:</strong> {loan.bookTitle} <br />
          <strong>Loan Date:</strong> {loan.loanDate} <br />
          <strong>Return Date:</strong> {loan.returnDate} <br />
          <strong>Status:</strong> {loan.status}
        </Card.Text>

        <div className="loan-card-buttons">
          <Button variant="outline-secondary" className="me-2 edit-btn">Edit</Button>
          <Button variant="danger" className="delete-btn">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
