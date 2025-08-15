import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './AuthorCard.css';

export default function AuthorCard({ author }) {
  return (
    <Card className="author-card-long">
      <Card.Body className="d-flex justify-content-between align-items-start">
        
        {/* Left Side: Author Info */}
        <div>
          <Card.Title className="author-card-title">{author.name}</Card.Title>

          <Card.Text className="author-card-text">
            <strong>Author ID:</strong> {author.id} <br />
            <strong>Bio:</strong> {author.bio}
          </Card.Text>
        </div>

        {/* Right Side: Buttons */}
        <div className="author-card-buttons">
          <Button variant="outline-secondary" size="sm" className="edit-button me-2">Edit</Button>
          <Button variant="danger" className="delete-btn">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
