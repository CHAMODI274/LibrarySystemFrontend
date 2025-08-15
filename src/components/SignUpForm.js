import React, { useState } from 'react'
import { useNavigate } from "react-router-dom" 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Alert from "react-bootstrap/Alert"

export default function SignUpForm({ show, onHide }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem("library_users") || "[]")

      // Check if email already exists
      if (users.find((u) => u.email === email)) {
        setError("An account with this email already exists.")
        setLoading(false)
        return
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      }

      // Add to users array and save to localStorage
      users.push(newUser)
      localStorage.setItem("library_users", JSON.stringify(users))

      // Auto sign in the new user
      localStorage.setItem(
        "library_current_user",
        JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          loginTime: new Date().toISOString(),
        }),
      )

      setSuccess("Account created successfully! You are now signed in.")
      console.log("Sign up successful:", newUser.email)

      // Close modal and refresh after short delay
      setTimeout(() => {
        onHide()
        navigate("/dashboard")
      }, 1500)
    } catch (err) {
      setError("An error occurred during sign up. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password (minimum 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Form>


      </Modal.Body>
    </Modal>
  )
}
