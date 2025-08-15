import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './UserCard.css';

export default function UseCard({ user }) {
  return (
 <Card className="user-card-long">
      <Card.Body className="d-flex justify-content-between align-items-start">
        {/* Left side: User info */}
        <div>
          <Card.Title className="user-card-title">{user.name}</Card.Title>
          <Card.Subtitle className="user-card-subtitle mb-2">
            Role: {user.role}
          </Card.Subtitle>

          <Card.Text className="user-card-text">
            <strong>User ID:</strong> {user.id} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Status:</strong> {user.status}
          </Card.Text>
        </div>

        {/* Right side: Buttons */}
        <div className="user-card-buttons">
          <Button variant="outline-secondary" size="sm" className="edit-button me-2">Edit</Button>
          <Button variant="danger" className="delete-btn">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
