import React, { useState } from 'react'
import { Link } from 'react-router-dom';
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
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            </Nav>

            {/* Right-aligned buttons - SignIn/UP */}
            <div className="auth-buttons ms-auto">
            <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => setShowSignIn(true)}
            > Sign In
            </Button>
              
            <Button
                variant="primary"
                onClick={() => setShowSignUp(true)}
            >Sign Up
            </Button>
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


