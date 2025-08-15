import React from 'react'
import SideNavbar from '../components/SideNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function BookCatalog() {
  return (
    <div style={{ display: 'flex' }}>
      {/* Side Navigation */}
      <SideNavbar />

      {/* Main Content */}
      <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
        
        {/* Page Heading and Add Book Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1>Book Catalog</h1>
            <p className="text-muted">
              Discover Your Next Great Read – Explore Our Extensive Catalog
            </p>
          </div>
          <Button variant="success" className="px-4">
            Add New Book
          </Button>
        </div>

        {/* Search and Category Filter */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search books by title or Book ID..."
            />
          </InputGroup>

          <DropdownButton
            id="dropdown-categories"
            title="All Categories"
            variant="outline-secondary"
          >
            <Dropdown.Item>All Categories</Dropdown.Item>
            <Dropdown.Item>Fiction</Dropdown.Item>
            <Dropdown.Item>Science</Dropdown.Item>
            <Dropdown.Item>History</Dropdown.Item>
          </DropdownButton>
        </div>

        {/* Placeholder for books listing */}
        <div>
          {/* Book cards or table will go here later */}
        </div>
      </div>
    </div>
  )
}
