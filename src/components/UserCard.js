import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from "react-bootstrap/Badge"
import './UserCard.css';

export default function UseCard({ user, onEdit, onDelete }) {
   const handleEdit = () => {
    if (onEdit) {
      onEdit(user)
    }
  }

  const handleDelete = () => {
    if (onDelete && window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      onDelete(user.id)
    }
  }

  const getStatusVariant = (status) => {
    return status === "Active" ? "success" : "secondary"
  }


  return (
 <Card className="user-card-long">
      <Card.Body className="d-flex justify-content-between align-items-start">


        {/* Left side: User info */}
        <div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <Card.Title className="user-card-title mb-0">{user.name}</Card.Title>
            <Badge bg={getStatusVariant(user.status)}>{user.status}</Badge>
          </div>

          <Card.Subtitle className="user-card-subtitle mb-2">Role: {user.role}</Card.Subtitle>

          <Card.Text className="user-card-text">
            <strong>User ID:</strong> {user.id} <br />
            <strong>Email:</strong> {user.email} <br />
            {user.phone && (
              <>
                <strong>Phone:</strong> {user.phone} <br />
              </>
            )}
            {user.joinDate && (
              <>
                <strong>Join Date:</strong> {user.joinDate}
              </>
            )}
          </Card.Text>
        </div>


        {/* Right side: Buttons */}
        <div className="user-card-buttons">
          <Button variant="outline-secondary" size="sm" className="edit-button me-2" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="danger" size="sm" className="delete-btn" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
