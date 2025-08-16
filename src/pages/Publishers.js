import React, { useState } from 'react';
import SideNavbar from '../components/SideNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import PublisherCard from '../components/PublisherCard';
import AddPublisherModal from '../components/AddPublisherModal';
import EditPublisherModal from "../components/EditPublisherModal"
import { getAllPublishers, deletePublisher, searchPublishers } from "../utils/publisherAPI"

export default function Publishers() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedPublisher, setSelectedPublisher] = useState(null)
  const [publishers, setPublishers] = useState([])
  const [filteredPublishers, setFilteredPublishers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    loadPublishers()
  }, [])

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = searchPublishers(searchTerm)
      setFilteredPublishers(filtered)
    } else {
      setFilteredPublishers(publishers)
    }
  }, [searchTerm, publishers])

  const loadPublishers = async () => {
    try {
      setLoading(true)
      const publishersData = getAllPublishers()
      setPublishers(publishersData)
      setFilteredPublishers(publishersData)
    } catch (error) {
      setError("Failed to load publishers")
      console.error("Error loading publishers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePublisherAdded = (newPublisher) => {
    setPublishers((prev) => [...prev, newPublisher])
    setSuccessMessage("Publisher added successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handlePublisherUpdated = (updatedPublisher) => {
    setPublishers((prev) =>
      prev.map((publisher) => (publisher.id === updatedPublisher.id ? updatedPublisher : publisher)),
    )
    setSuccessMessage("Publisher updated successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleEditPublisher = (publisher) => {
    setSelectedPublisher(publisher)
    setShowEditModal(true)
  }

  const handleDeletePublisher = async (publisherId) => {
    try {
      const result = await deletePublisher(publisherId)
      if (result.success) {
        setPublishers((prev) => prev.filter((publisher) => publisher.id !== publisherId))
        setSuccessMessage("Publisher deleted successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        setError(result.error || "Failed to delete publisher")
        setTimeout(() => setError(""), 3000)
      }
    } catch (error) {
      setError("An error occurred while deleting the publisher")
      setTimeout(() => setError(""), 3000)
      console.error("Error deleting publisher:", error)
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div style={{ display: 'flex' }}>
      {/* Side Navigation */}
      <SideNavbar />

      {/* Main Content */}
      <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
        {/* Page Heading */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1>Publishers</h1>
            <p className="text-muted">View and manage all publishers in the library system</p>
          </div>
          <Button variant="success" onClick={() => setShowAddModal(true)}>
            Add New Publisher
          </Button>
        </div>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Search & Filter */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search publishers by name, address, email, or ID..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {/* Publisher Count */}
            <div className="mb-3">
              <small className="text-muted">
                Showing {filteredPublishers.length} of {publishers.length} publishers
              </small>
            </div>

            {/* Publisher Cards */}
            <div className="d-flex flex-wrap gap-3">
              {filteredPublishers.length > 0 ? (
                filteredPublishers.map((publisher) => (
                  <PublisherCard
                    key={publisher.id}
                    publisher={publisher}
                    onEdit={handleEditPublisher}
                    onDelete={handleDeletePublisher}
                  />
                ))
              ) : (
                <div className="text-center w-100">
                  <p className="text-muted">
                    {searchTerm ? "No publishers found matching your search." : "No publishers available."}
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        <AddPublisherModal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          onPublisherAdded={handlePublisherAdded}
        />

        <EditPublisherModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          publisher={selectedPublisher}
          onPublisherUpdated={handlePublisherUpdated}
        />
      </div>
    </div>
  )
}
