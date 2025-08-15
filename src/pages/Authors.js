import React, { useState } from 'react';
import SideNavbar from '../components/SideNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AuthorCard from '../components/AuthorCard';
import AddAuthorModal from '../components/AddAuthorModal';

export default function Authors() {
    const [showModal, setShowModal] = useState(false);

    // Sample Data
const authors = [
  { 
    id: 1, 
    name: 'James Clear',  
    bio: 'James Clear is an author and speaker focused on habits, decision-making, and continuous improvement.'
  },
  { 
    id: 2, 
    name: 'Yuval Noah Harari', 
    bio: 'Yuval Noah Harari is a historian and philosopher, best known for his book "Sapiens" exploring human history.'
  },
  { 
    id: 3, 
    name: 'Paulo Coelho', 
    bio: 'Paulo Coelho is a Brazilian lyricist and novelist, best known for his novel "The Alchemist".'
  }
];


  return (
    <div style={{ display: 'flex' }}>
      {/* Side Navigation */}
      <SideNavbar />

      {/* Main Content */}
      <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
        
        {/* Page Heading */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1>Authors</h1>
            <p className="text-muted">
              View and manage all authors in the library system
            </p>
          </div>
          <Button variant="success" onClick={() => setShowModal(true)}>
            Add New Author
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search authors by name or ID..."
            />
          </InputGroup>

        </div>

        {/* Author Cards */}
        <div className="d-flex flex-wrap gap-3">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>

        <AddAuthorModal show={showModal} onHide={() => setShowModal(false)} />
      </div>
    </div>
  )
}
