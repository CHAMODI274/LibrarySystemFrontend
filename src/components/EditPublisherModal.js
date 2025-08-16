import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"

export default function EditPublisherModal({ show, onHide, publisher, onPublisherUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (publisher) {
      setFormData({
        name: publisher.name || "",
        address: publisher.address || "",
      })
    }
  }, [publisher])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { updatePublisher } = await import("../utils/publisherAPI")
      const result = await updatePublisher(publisher.id, formData)

      if (result.success) {
        onPublisherUpdated(result.data)
        onHide()
        setFormData({
          name: "",
          address: "",
        })
      } else {
        setError(result.error || "Failed to update publisher")
      }
    } catch (error) {
      setError("An error occurred while updating the publisher")
      console.error("Error updating publisher:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setError("")
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Publisher</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formPublisherName">
            <Form.Label>Publisher Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter publisher name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPublisherAddress">
            <Form.Label>Address *</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Publisher"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
