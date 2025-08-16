import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './AuthorCard.css';

export default function AuthorCard({ author, onEdit, onDelete }) {
  const handleEdit = () => {
    onEdit(author)
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${author.name}"?`)) {
      onDelete(author.id)
    }
  }


  return (
    <Card className="author-card-long">
      <Card.Body className="d-flex justify-content-between align-items-start">
        
        {/* Left Side: Author Info */}
        <div>
          <Card.Title className="author-card-title">{author.name}</Card.Title>

          <Card.Text className="author-card-text">
            <strong>Author ID:</strong> {author.id} <br />
            <strong>Bio:</strong> {author.bio}
            {author.nationality && (
              <>
                <br />
                <strong>Nationality:</strong> {author.nationality}
              </>
            )}
            {author.birthYear && (
              <>
                <br />
                <strong>Birth Year:</strong> {author.birthYear}
              </>
            )}
          </Card.Text>
        </div>

        {/* Right Side: Buttons */}
        <div className="author-card-buttons">
          <Button variant="outline-secondary" size="sm" className="edit-button me-2" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="danger" className="delete-btn" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
