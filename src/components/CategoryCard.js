import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './CategoryCard.css';

export default function CategoryCard({ category }) {
  return (
    <Card className="category-card">
      <Card.Body>
        <Card.Title className="category-card-title">{category.name}</Card.Title>

        <Card.Text className="category-card-text">
          <strong>Category ID:</strong> {category.id}
        </Card.Text>

        <div className="category-card-buttons">
          <Button variant="outline-secondary" className="me-2 edit-btn">Edit</Button>
          <Button variant="danger" className="delete-btn">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
