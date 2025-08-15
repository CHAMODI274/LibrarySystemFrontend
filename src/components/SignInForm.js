import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Alert from "react-bootstrap/Alert"

export default function SignInForm({ show, onHide }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem("library_users") || "[]")
      const user = users.find((u) => u.email === email && u.password === password)

      if (user) {
        // Store current user session
        localStorage.setItem(
          "library_current_user",
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            loginTime: new Date().toISOString(),
          }),
        )

        console.log("Sign in successful:", user.email)
        onHide() // close modal after successful login

        navigate("/dashboard")
      } else {
        setError("Invalid email or password. Please try again.")
      }
    } catch (err) {
      setError("An error occurred during sign in. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
     <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Form>


      </Modal.Body>
    </Modal>
  )
}


