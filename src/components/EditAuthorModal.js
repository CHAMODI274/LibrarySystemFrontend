import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"

export default function EditAuthorModal({ show, onHide, author, onAuthorUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    nationality: "",
    birthYear: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name || "",
        bio: author.bio || "",
        nationality: author.nationality || "",
        birthYear: author.birthYear || "",
      })
    }
  }, [author])

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
      const { updateAuthor } = await import("../utils/authorAPI")
      const updatedAuthor = await updateAuthor(author.id, {
        ...formData,
        birthYear: formData.birthYear ? Number.parseInt(formData.birthYear) : null,
      })

      onAuthorUpdated(updatedAuthor)
      onHide()

      // Reset form
      setFormData({
        name: "",
        bio: "",
        nationality: "",
        birthYear: "",
      })
    } catch (err) {
      setError("Failed to update author. Please try again.")
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
        <Modal.Title>Edit Author</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Author Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter author name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              placeholder="Enter author biography"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nationality</Form.Label>
            <Form.Control
              type="text"
              name="nationality"
              placeholder="Enter nationality"
              value={formData.nationality}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Birth Year</Form.Label>
            <Form.Control
              type="number"
              name="birthYear"
              placeholder="Enter birth year"
              value={formData.birthYear}
              onChange={handleInputChange}
              min="1800"
              max={new Date().getFullYear()}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Author"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
