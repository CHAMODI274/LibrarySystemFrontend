import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './BookCard.css';

const BookCard = ({ book }) => {
  return (
    <Card className="book-card">
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>

        <Card.Text>
          <strong>Published Year:</strong> {book.publishedYear} <br />
          <strong>Publisher:</strong> {book.publisher?.name} <br />
          <strong>Publisher Address:</strong> {book.publisher?.address} <br />
          <strong>Category:</strong> {book.category?.name}
        </Card.Text>

        <div>
        <Button variant="outline-secondary" className="me-2 edit-btn">Edit</Button>
        <Button variant="danger" className="delete-btn">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;