import React, { useState, useEffect } from 'react';
import SideNavbar from '../components/SideNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CategoryCard from '../components/CategoryCard';
import AddCategoryModal from '../components/AddCategoryModal';
import EditCategoryModal from "../components/EditCategoryModal"
import { getAllCategories, searchCategories, deleteCategory  } from "../utils/categoryAPI"

export default function Categories() {
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [alert, setAlert] = useState({ show: false, message: "", type: "" })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const result = await getAllCategories()
      if (result.success) {
        setCategories(result.data)
      } else {
        showAlert("Failed to load categories", "danger")
      }
    } catch (error) {
      console.error("Error loading categories:", error)
      showAlert("Error loading categories", "danger")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (term) => {
    setSearchTerm(term)
    if (term.trim() === "") {
      loadCategories()
      return
    }

    try {
      setLoading(true)
      const result = await searchCategories(term)
      if (result.success) {
        setCategories(result.data)
      } else {
        showAlert("Search failed", "danger")
      }
    } catch (error) {
      console.error("Error searching categories:", error)
      showAlert("Search error", "danger")
    } finally {
      setLoading(false)
    }
  }

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type })
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000)
  }

  const handleCategoryAdded = () => {
    loadCategories()
    showAlert("Category added successfully!", "success")
  }

  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setShowEditModal(true)
  }

  const handleCategoryUpdated = () => {
    loadCategories()
    showAlert("Category updated successfully!", "success")
  }

  const handleDeleteCategory = async (category) => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        const result = await deleteCategory(category.id)
        if (result.success) {
          loadCategories()
          showAlert("Category deleted successfully!", "success")
        } else {
          showAlert("Failed to delete category", "danger")
        }
      } catch (error) {
        console.error("Error deleting category:", error)
        showAlert("Error deleting category", "danger")
      }
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
            <h1>Categories</h1>
            <p className="text-muted">
              View and manage all categories in the library system
            </p>
          </div>
          <Button variant="success" onClick={() => setShowModal(true)}>
            Add New Category
          </Button>
        </div>

        {alert.show && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.message}
          </div>
        )}

        {/* Search & Filter */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search categories by ID or name..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (

          /* Category Cards */
          <div className="d-flex flex-wrap gap-3">
            {categories.length > 0 ? (
              categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                />
              ))
            ) : (
              <div className="text-center py-4 w-100">
                <p className="text-muted">No categories found</p>
              </div>
            )}
          </div>
        )}

        <AddCategoryModal show={showModal} onHide={() => setShowModal(false)} onCategoryAdded={handleCategoryAdded} />
        <EditCategoryModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          category={selectedCategory}
          onCategoryUpdated={handleCategoryUpdated}
        />
      </div>
    </div>
  )
}
