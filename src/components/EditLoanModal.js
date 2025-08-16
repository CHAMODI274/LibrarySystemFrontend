"use client"

import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

export default function EditLoanModal({ show, onHide, onClose, onSave, loan, books = [], users = [] }) {
  const close = () => {
    if (typeof onHide === "function") onHide()
    else if (typeof onClose === "function") onClose()
  }

  // Helper to format date YYYY-MM-DD
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  const [bookId, setBookId] = useState("")
  const [memberId, setMemberId] = useState("")
  const [loanDate, setLoanDate] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [status, setStatus] = useState("Active")
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (show && loan) {
      setBookId(loan.bookId || "")
      setMemberId(loan.memberId || "")
      setLoanDate(formatDate(loan.loanDate) || "")
      setDueDate(formatDate(loan.dueDate) || "")
      setReturnDate(formatDate(loan.returnDate) || "")
      setStatus(loan.status || "Active")
      setErrors({})
    }
  }, [show, loan])

  const validate = () => {
    const e = {}
    if (!bookId) e.bookId = "Book is required"
    if (!memberId) e.memberId = "Member is required"
    if (!loanDate) e.loanDate = "Loan date is required"
    if (!dueDate) e.dueDate = "Due date is required"

    if (loanDate && dueDate && new Date(dueDate) < new Date(loanDate)) {
      e.dueDate = "Due date cannot be before loan date"
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const updatedLoan = {
      bookId: typeof bookId === "string" ? Number.parseInt(bookId, 10) : bookId,
      memberId: typeof memberId === "string" ? Number.parseInt(memberId, 10) : memberId,
      loanDate,
      dueDate,
      returnDate: returnDate || null,
      status,
    }

    if (typeof onSave === "function") onSave(loan.id, updatedLoan)
    close()
  }

  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Loan</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="editLoanBook">
            <Form.Label>Book</Form.Label>
            <Form.Select
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              isInvalid={!!errors.bookId}
              required
            >
              <option value="">Select book</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.bookId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editLoanMember">
            <Form.Label>Member</Form.Label>
            <Form.Select
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              isInvalid={!!errors.memberId}
              required
            >
              <option value="">Select member</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.memberId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editLoanDate">
            <Form.Label>Loan Date</Form.Label>
            <Form.Control
              type="date"
              value={loanDate}
              onChange={(e) => setLoanDate(e.target.value)}
              isInvalid={!!errors.loanDate}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.loanDate}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              isInvalid={!!errors.dueDate}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.dueDate}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editReturnDate">
            <Form.Label>Return Date (optional)</Form.Label>
            <Form.Control type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editLoanStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Active</option>
              <option>Returned</option>
              <option>Overdue</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={close} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update Loan
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}


