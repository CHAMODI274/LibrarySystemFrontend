import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './PublisherCard.css';

export default function PublisherCard({ publisher }) {
  return (
<Card className="publisher-card">
      <Card.Body>
        <Card.Title className="publisher-card-title">{publisher.name}</Card.Title>
        <Card.Subtitle className="publisher-card-subtitle mb-2">
          Address: {publisher.address}
        </Card.Subtitle>

        <Card.Text className="publisher-card-text">
          <strong>Publisher ID:</strong> {publisher.id}
        </Card.Text>

        <div className="publisher-card-buttons">
          <Button variant="outline-secondary" className="me-2 edit-btn">Edit</Button>
          <Button variant="danger" className="delete-btn">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
