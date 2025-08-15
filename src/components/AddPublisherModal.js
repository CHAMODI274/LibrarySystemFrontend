import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function AddPublisherModal({ show, onHide }) {
  
  const [publisherName, setPublisherName] = useState('');
  const [address, setAddress] = useState('');

   const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Publisher:', {
      publisherName,
      address
    });
    // Call API to save publisher here
    onHide(); // close modal
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Publisher</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formPublisherName">
            <Form.Label>Publisher Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter publisher name"
              value={publisherName}
              onChange={(e) => setPublisherName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPublisherAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Add Publisher
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}