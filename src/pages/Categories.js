import React from 'react'
import SideNavbar from '../components/SideNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CategoryCard from '../components/CategoryCard';

export default function Categories() {

// Sample categories
  const categories = [
    { id: 1, name: 'Fiction' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'History' },
    { id: 4, name: 'Self-help' },
    { id: 5, name: 'Horror' },
    { id: 6, name: 'Memoir' }
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
            <h1>Categories</h1>
            <p className="text-muted">
              View and manage all categories in the library system
            </p>
          </div>
          <Button variant="success" className="px-4">
            Add New Category
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search categories by name or ID..."
            />
          </InputGroup>
        </div>

        {/* Category Cards */}
        <div className="d-flex flex-wrap gap-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}
