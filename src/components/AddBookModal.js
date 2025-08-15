import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function AddBookModal({
  show,
  onHide,
  onClose, // alias support
  onSave,
  authors = [],
  publishers = [],
  categories = []
}) {
  const close = () => {
    if (typeof onHide === 'function') onHide();
    else if (typeof onClose === 'function') onClose();
  };

  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [authorId, setAuthorId] = useState(authors[0]?.id ?? '');
  const [publisherId, setPublisherId] = useState(publishers[0]?.id ?? '');
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? '');
  const [copies, setCopies] = useState(1);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    if (!authorId) e.authorId = 'Author is required';
    if (!publisherId) e.publisherId = 'Publisher is required';
    if (!categoryId) e.categoryId = 'Category is required';
    if (publishedYear && !/^\d{4}$/.test(String(publishedYear))) e.publishedYear = 'Enter a valid 4-digit year';
    if (!copies || Number(copies) < 0) e.copies = 'Enter a valid number of copies';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newBook = {
      id: Date.now(),
      title: title.trim(),
      isbn: isbn.trim(),
      publishedYear: publishedYear ? parseInt(publishedYear, 10) : null,
      authorId: typeof authorId === 'string' ? parseInt(authorId, 10) : authorId,
      publisherId: typeof publisherId === 'string' ? parseInt(publisherId, 10) : publisherId,
      categoryId: typeof categoryId === 'string' ? parseInt(categoryId, 10) : categoryId,
      copies: Number(copies)
    };

    if (typeof onSave === 'function') onSave(newBook);
    // close after saving
    close();
  };

  // Reset fields when the modal is opened
  React.useEffect(() => {
    if (show) {
      setTitle('');
      setIsbn('');
      setPublishedYear('');
      setAuthorId(authors[0]?.id ?? '');
      setPublisherId(publishers[0]?.id ?? '');
      setCategoryId(categories[0]?.id ?? '');
      setCopies(1);
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="bookTitle">
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

          <Form.Group className="mb-3" controlId="bookAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Select
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              isInvalid={!!errors.authorId}
              required
            >
              <option value="">Select author</option>
              {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.authorId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="bookPublisher">
            <Form.Label>Publisher</Form.Label>
            <Form.Select
              value={publisherId}
              onChange={(e) => setPublisherId(e.target.value)}
              isInvalid={!!errors.publisherId}
              required
            >
              <option value="">Select publisher</option>
              {publishers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.publisherId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="bookCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              isInvalid={!!errors.categoryId}
              required
            >
              <option value="">Select category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.categoryId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="bookIsbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              placeholder="ISBN (optional)"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="bookYear">
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

          <Form.Group className="mb-3" controlId="bookCopies">
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
          <Button variant="success" type="submit">
            Add Book
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
