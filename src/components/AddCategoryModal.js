import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addCategory } from "../utils/categoryAPI"

export default function AddCategoryModal({ show, onHide, onCategoryAdded }) {
  const [categoryName, setCategoryName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result = await addCategory({
        name: categoryName,
        description: description,
      })

      if (result.success) {
        // Reset form
        setCategoryName("")
        setDescription("")
        onHide() // close modal
        // Notify parent component
        if (onCategoryAdded) {
          onCategoryAdded()
        }
      } else {
        console.error("Failed to add category")
      }
    } catch (error) {
      console.error("Error adding category:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100" disabled={loading}>
            {loading ? "Adding..." : "Add Category"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
