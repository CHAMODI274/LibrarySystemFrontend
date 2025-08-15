import React, { useState } from 'react';
import SideNavbar from '../components/SideNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PublisherCard from '../components/PublisherCard';
import AddPublisherModal from '../components/AddPublisherModal';

export default function Publishers() {
    const [showModal, setShowModal] = useState(false);

// Sample publishers data
const publishers = [
  { id: 1, name: 'Avery', address: 'New York, USA' },
  { id: 2, name: 'Harper', address: 'London, UK' },
  { id: 3, name: 'Random House', address: 'New York, USA' }
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
            <h1>Publishers</h1>
            <p className="text-muted">
              View and manage all publishers in the library system
            </p>
          </div>
          <Button variant="success" onClick={() => setShowModal(true)}>
            Add New Publisher
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search publishers by name or ID..."
            />
          </InputGroup>

        </div>

        {/* Publisher Cards */}
        <div className="d-flex flex-wrap gap-3">
          {publishers.map((publisher) => (
             <PublisherCard key={publisher.id} publisher={publisher} />
              ))}
        </div>

        <AddPublisherModal
          show={showModal}
          onHide={() => setShowModal(false)}
        />

      </div>
    </div>
  );
}
