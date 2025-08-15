import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './UserCard.css';

export default function UseCard({ user }) {
  return (
    <Card className="user-card">
      <Card.Body>
        <Card.Title className="user-card-title">{user.name}</Card.Title>
        <Card.Subtitle className="user-card-subtitle mb-2">
          Role: {user.role}
        </Card.Subtitle>

        <Card.Text className="user-card-text">
          <strong>User ID:</strong> {user.id} <br />
          <strong>Email:</strong> {user.email} <br />
          <strong>Phone:</strong> {user.phone} <br />
          <strong>Status:</strong> {user.status}
        </Card.Text>

        <div className="user-card-buttons">
          <Button variant="outline-secondary" className="me-2 edit-btn">Edit</Button>
          <Button variant="danger" className="delete-btn">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
