import React from 'react'
import SideNavbar from '../components/SideNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UserCard from '../components/UserCard';

export default function UserManagement() {

      // Sample user data
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '987-654-3210', role: 'Librarian', status: 'Inactive' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '456-789-1234', role: 'Member', status: 'Active' }
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
            <h1>User Management</h1>
            <p className="text-muted">
              Manage all library users, roles, and access permissions
            </p>
          </div>
          <Button variant="success" className="px-4">
            Add New User
          </Button>
        </div>

        {/* Search & Role Filter */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search users by name or ID..."
            />
          </InputGroup>

          <DropdownButton
            id="dropdown-roles"
            title="All Roles"
            variant="outline-secondary"
          >
            <Dropdown.Item>All Roles</Dropdown.Item>
            <Dropdown.Item>Admin</Dropdown.Item>
            <Dropdown.Item>Librarian</Dropdown.Item>
            <Dropdown.Item>Member</Dropdown.Item>
          </DropdownButton>
        </div>

        {/* User Cards */}
        <div className="d-flex flex-wrap gap-3">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
