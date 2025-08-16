import React, { useState, useEffect } from 'react';
import SideNavbar from '../components/SideNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Alert from "react-bootstrap/Alert"
import UserCard from '../components/UserCard';
import AddUserModal from '../components/AddUserModal';
import EditUserModal from "../components/EditUserModal"
import { getUsers, deleteUser, searchUsers, filterUsersByRole } from "../utils/userAPI"

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("All Roles")
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState({ show: false, message: "", variant: "success" })

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [users, searchQuery, selectedRole])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const userData = await getUsers()
      setUsers(userData)
    } catch (error) {
      showAlert("Failed to load users", "danger")
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = users

    // Apply search filter
    if (searchQuery) {
      filtered = searchUsers(searchQuery)
    }

    // Apply role filter
    if (selectedRole !== "All Roles") {
      filtered = filterUsersByRole(selectedRole)
    }

    // Apply both filters if both are active
    if (searchQuery && selectedRole !== "All Roles") {
      filtered = users.filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.id.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRole = user.role === selectedRole
        return matchesSearch && matchesRole
      })
    }

    setFilteredUsers(filtered)
  }

  const showAlert = (message, variant = "success") => {
    setAlert({ show: true, message, variant })
    setTimeout(() => setAlert({ show: false, message: "", variant: "success" }), 3000)
  }

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, newUser])
    showAlert("User added successfully!")
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowEditModal(true)
  }

  const handleUpdateUser = (updatedUser) => {
    setUsers((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    showAlert("User updated successfully!")
  }

  const handleDeleteUser = async (userId) => {
    try {
      const result = await deleteUser(userId)
      if (result.success) {
        setUsers((prev) => prev.filter((user) => user.id !== userId))
        showAlert("User deleted successfully!")
      } else {
        showAlert(result.error || "Failed to delete user", "danger")
      }
    } catch (error) {
      showAlert("An error occurred while deleting the user", "danger")
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleRoleFilter = (role) => {
    setSelectedRole(role)
  }


  return (
    <div style={{ display: 'flex' }}>
      {/* Side Navigation */}
      <SideNavbar />

      {/* Main Content */}
      <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>

        {/* Alert */}
        {alert.show && (
          <Alert variant={alert.variant} className="mb-3">
            {alert.message}
          </Alert>
        )}
        
        {/* Page Heading */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1>User Management</h1>
            <p className="text-muted">
              Manage all library users, roles, and access permissions
            </p>
          </div>
         <Button variant="success" className="px-4" onClick={() => setShowAddModal(true)}>
            Add New User
          </Button>
        </div>

        {/* Search & Role Filter */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search users by name, email, or ID..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>

          <DropdownButton id="dropdown-roles" title={selectedRole} variant="outline-secondary">
            <Dropdown.Item onClick={() => handleRoleFilter("All Roles")}>All Roles</Dropdown.Item>
            <Dropdown.Item onClick={() => handleRoleFilter("Admin")}>Admin</Dropdown.Item>
            <Dropdown.Item onClick={() => handleRoleFilter("Member")}>Member</Dropdown.Item>
          </DropdownButton>
        </div>


        {/* User Cards */}
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted">No users found matching your criteria.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} onEdit={handleEditUser} onDelete={handleDeleteUser} />
            ))}
          </div>
        )}


        {/* Add User Modal */}
        <AddUserModal show={showAddModal} onHide={() => setShowAddModal(false)} onUserAdded={handleAddUser} />

        {/* Edit User Modal */}
        <EditUserModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          user={selectedUser}
          onUserUpdated={handleUpdateUser}
        />
      </div>
    </div>
  );
}
