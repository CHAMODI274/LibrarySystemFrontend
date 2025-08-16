import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import { updateCategory } from "../utils/categoryAPI"

export default function EditCategoryModal({ show, onHide, category, onCategoryUpdated }) {
  const [categoryId, setCategoryId] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (category) {
      setCategoryId(category.id || "")
      setCategoryName(category.name || "")
    }
  }, [category])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result = await updateCategory(category.id, {
        id: categoryId,
        name: categoryName,
      })

      if (result.success) {
        onHide() // close modal
        // Notify parent component
        if (onCategoryUpdated) {
          onCategoryUpdated()
        }
      } else {
        console.error("Failed to update category")
      }
    } catch (error) {
      console.error("Error updating category:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    // Reset form when closing
    setCategoryId("")
    setCategoryName("")
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formCategoryId">
            <Form.Label>Category ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category ID"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            />
          </Form.Group>

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

          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? "Updating..." : "Update Category"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
