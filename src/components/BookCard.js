import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './BookCard.css';

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <Card className="book-card">
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>

        <Card.Text>
          <strong>Published Year:</strong> {book.publishedYear} <br />
          <strong>Publisher:</strong> {book.publisher?.name} <br />
          <strong>Publisher Address:</strong> {book.publisher?.address} <br />
          <strong>Category:</strong> {book.category?.name} <br />
          <strong>ISBN:</strong> {book.isbn || "N/A"} <br />
          <strong>Copies Available:</strong> {book.copies || 0}
        </Card.Text>

        <div>
          <Button variant="outline-secondary" className="me-2 edit-btn" onClick={() => onEdit(book)}>
            Edit
          </Button>
          <Button variant="danger" className="delete-btn" onClick={() => onDelete(book.id)}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;