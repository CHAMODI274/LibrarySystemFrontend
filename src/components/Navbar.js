import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './Navbar.css' 
import LibraryIcon from '../assets/LibraryIcon.png'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

export default function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

useEffect(() => {
    const checkAuthState = () => {
      const user = localStorage.getItem("library_current_user")
      if (user) {
        setCurrentUser(JSON.parse(user))
      } else {
        setCurrentUser(null)
      }
    }

    checkAuthState()
  }, [location]) // Re-run when location changes

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "library_current_user") {
        if (e.newValue) {
          setCurrentUser(JSON.parse(e.newValue))
        } else {
          setCurrentUser(null)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("library_current_user")
    setCurrentUser(null)
    navigate("/")
  }


  return (
    <>
      <NavbarBootstrap expand="lg" className="bg-body-tertiary">

        <Container>
          <NavbarBootstrap.Brand href="#home" className="d-flex align-items-center">
            <img
              src={LibraryIcon}
              alt="Library Logo"
              className="navbar-logo"
            />
            <span className="ms-2">Library Management System</span>
          </NavbarBootstrap.Brand>


          <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
          <NavbarBootstrap.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>


            <div className="auth-buttons ms-auto">
              {currentUser ? (
                <div className="d-flex align-items-center">
                  <span className="me-3 text-dark fw-medium">{currentUser.name}</span>
                  <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline-primary" className="me-2" onClick={() => setShowSignIn(true)}>
                    {" "}
                    Sign In
                  </Button>

                  <Button variant="primary" onClick={() => setShowSignUp(true)}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </NavbarBootstrap.Collapse>
        </Container>
      </NavbarBootstrap>


      {/* Sign In Modal */}
      <SignInForm show={showSignIn} onHide={() => setShowSignIn(false)} />

      {/* Sign Up Modal */}
      <SignUpForm show={showSignUp} onHide={() => setShowSignUp(false)} />
    </>
  )
}
