import React, { useState, useEffect } from 'react';
import SideNavbar from '../components/SideNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import AuthorCard from '../components/AuthorCard';
import AddAuthorModal from '../components/AddAuthorModal';
import EditAuthorModal from "../components/EditAuthorModal"
import { fetchAuthors, deleteAuthor, searchAuthors } from "../utils/authorAPI"

export default function Authors() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [authors, setAuthors] = useState([])
  const [filteredAuthors, setFilteredAuthors] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    loadAuthors()
  }, [])

  useEffect(() => {
    handleSearch()
  }, [searchQuery, authors])

  const loadAuthors = async () => {
    try {
      setLoading(true)
      const authorsData = await fetchAuthors()
      setAuthors(authorsData)
      setFilteredAuthors(authorsData)
    } catch (err) {
      setError("Failed to load authors")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setFilteredAuthors(authors)
    } else {
      try {
        const results = await searchAuthors(searchQuery)
        setFilteredAuthors(results)
      } catch (err) {
        setError("Search failed")
      }
    }
  }

  const handleAuthorAdded = (newAuthor) => {
    setAuthors((prev) => [...prev, newAuthor])
    setSuccessMessage("Author added successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleAuthorUpdated = (updatedAuthor) => {
    setAuthors((prev) => prev.map((author) => (author.id === updatedAuthor.id ? updatedAuthor : author)))
    setSuccessMessage("Author updated successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleEdit = (author) => {
    setSelectedAuthor(author)
    setShowEditModal(true)
  }

  const handleDelete = async (authorId) => {
    try {
      await deleteAuthor(authorId)
      setAuthors((prev) => prev.filter((author) => author.id !== authorId))
      setSuccessMessage("Author deleted successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      setError("Failed to delete author")
      setTimeout(() => setError(""), 3000)
    }
  }


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
          <Button variant="success" onClick={() => setShowAddModal(true)}>
            Add New Author
          </Button>
        </div>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}


        {/* Search & Filter */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search authors by name, bio, nationality, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            <div className="mb-3">
              <small className="text-muted">
                Showing {filteredAuthors.length} of {authors.length} authors
              </small>
            </div>



        {/* Author Cards */}
        <div className="d-flex flex-wrap gap-3">
              {filteredAuthors.length > 0 ? (
                filteredAuthors.map((author) => (
                  <AuthorCard key={author.id} author={author} onEdit={handleEdit} onDelete={handleDelete} />
                ))
              ) : (
                <div className="text-center w-100">
                  <p className="text-muted">No authors found matching your search.</p>
                </div>
              )}
            </div>
          </>
        )}

        <AddAuthorModal show={showAddModal} onHide={() => setShowAddModal(false)} onAuthorAdded={handleAuthorAdded} />

        <EditAuthorModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          author={selectedAuthor}
          onAuthorUpdated={handleAuthorUpdated}
        />
      </div>
    </div>
  )
}
