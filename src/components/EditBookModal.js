import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

export default function EditBookModal( {
  show,
  onHide,
  onClose,
  onSave,
  book,
  authors = [],
  publishers = [],
  categories = [],
}) {
    
  const close = () => {
    if (typeof onHide === "function") onHide()
    else if (typeof onClose === "function") onClose()
  }

  const [title, setTitle] = useState("")
  const [isbn, setIsbn] = useState("")
  const [publishedYear, setPublishedYear] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [publisherId, setPublisherId] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [copies, setCopies] = useState(1)
  const [errors, setErrors] = useState({})

  // Populate form when book prop changes
  useEffect(() => {
    if (book && show) {
      setTitle(book.title || "")
      setIsbn(book.isbn || "")
      setPublishedYear(book.publishedYear || "")
      setAuthorId(book.authorId || "")
      setPublisherId(book.publisherId || "")
      setCategoryId(book.categoryId || "")
      setCopies(book.copies || 1)
      setErrors({})
    }
  }, [book, show])

  const validate = () => {
    const e = {}
    if (!title.trim()) e.title = "Title is required"
    if (!authorId) e.authorId = "Author is required"
    if (!publisherId) e.publisherId = "Publisher is required"
    if (!categoryId) e.categoryId = "Category is required"
    if (publishedYear && !/^\d{4}$/.test(String(publishedYear))) e.publishedYear = "Enter a valid 4-digit year"
    if (!copies || Number(copies) < 0) e.copies = "Enter a valid number of copies"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const updatedBook = {
      ...book,
      title: title.trim(),
      isbn: isbn.trim(),
      publishedYear: publishedYear ? Number.parseInt(publishedYear, 10) : null,
      authorId: typeof authorId === "string" ? Number.parseInt(authorId, 10) : authorId,
      publisherId: typeof publisherId === "string" ? Number.parseInt(publisherId, 10) : publisherId,
      categoryId: typeof categoryId === "string" ? Number.parseInt(categoryId, 10) : categoryId,
      copies: Number(copies),
    }

    if (typeof onSave === "function") onSave(updatedBook)
    close()
  }

  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="editBookTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isInvalid={!!errors.title}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editBookAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Select
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              isInvalid={!!errors.authorId}
              required
            >
              <option value="">Select author</option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.authorId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editBookPublisher">
            <Form.Label>Publisher</Form.Label>
            <Form.Select
              value={publisherId}
              onChange={(e) => setPublisherId(e.target.value)}
              isInvalid={!!errors.publisherId}
              required
            >
              <option value="">Select publisher</option>
              {publishers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.publisherId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editBookCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              isInvalid={!!errors.categoryId}
              required
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.categoryId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editBookIsbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              placeholder="ISBN (optional)"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editBookYear">
            <Form.Label>Published Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g. 2018"
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              isInvalid={!!errors.publishedYear}
            />
            <Form.Control.Feedback type="invalid">{errors.publishedYear}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editBookCopies">
            <Form.Label>Copies</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              isInvalid={!!errors.copies}
            />
            <Form.Control.Feedback type="invalid">{errors.copies}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="secondary" onClick={close} className="me-2">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update Book
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
