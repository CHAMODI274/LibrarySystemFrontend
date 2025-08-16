import { useEffect, useState } from "react"
import SideNavbar from "../components/SideNavbar"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import LoanCard from "../components/LoanCard"
import AddLoanModal from "../components/AddLoanModal"
import EditLoanModal from "../components/EditLoanModal"
import { loanAPI } from "../utils/loanAPI"

export default function Loan() {

  const [loans, setLoans] = useState([])
  const [books, setBooks] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editingLoan, setEditingLoan] = useState(null)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("All Status")
  const [alert, setAlert] = useState({ show: false, message: "", variant: "success" })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [loansData, booksData, usersData] = await Promise.all([
        loanAPI.getLoans(),
        loanAPI.getBooks(),
        loanAPI.getUsers(),
      ])

      setLoans(loansData)
      setBooks(booksData)
      setUsers(usersData)
    } catch (error) {
      showAlert("Error loading data: " + error.message, "danger")
    } finally {
      setLoading(false)
    }
  }

  const showAlert = (message, variant = "success") => {
    setAlert({ show: true, message, variant })
    setTimeout(() => setAlert({ show: false, message: "", variant: "success" }), 3000)
  }

  const handleAddLoan = async (newLoanData) => {
    try {
      await loanAPI.addLoan(newLoanData)
      await loadData() // Refresh data
      setShowAdd(false)
      showAlert("Loan added successfully!")
    } catch (error) {
      showAlert("Error adding loan: " + error.message, "danger")
    }
  }

  const handleEditLoan = (loan) => {
    setEditingLoan(loan)
    setShowEdit(true)
  }

  const handleUpdateLoan = async (loanId, updates) => {
    try {
      await loanAPI.updateLoan(loanId, updates)
      await loadData() // Refresh data
      setShowEdit(false)
      setEditingLoan(null)
      showAlert("Loan updated successfully!")
    } catch (error) {
      showAlert("Error updating loan: " + error.message, "danger")
    }
  }

  const handleDeleteLoan = async (loanId) => {
    if (window.confirm("Are you sure you want to delete this loan?")) {
      try {
        await loanAPI.deleteLoan(loanId)
        await loadData() // Refresh data
        showAlert("Loan deleted successfully!")
      } catch (error) {
        showAlert("Error deleting loan: " + error.message, "danger")
      }
    }
  }

  const visibleLoans = loans.filter((loan) => {
    // Status filter
    if (filterStatus && filterStatus !== "All Status" && loan.status !== filterStatus) {
      return false
    }

    // Search filter
    if (!search) return true

    const searchTerm = search.toLowerCase()
    return (
      loan.bookTitle.toLowerCase().includes(searchTerm) ||
      loan.borrowerName.toLowerCase().includes(searchTerm) ||
      loan.bookAuthor?.toLowerCase().includes(searchTerm) ||
      loan.status.toLowerCase().includes(searchTerm) ||
      loan.id.toString().includes(searchTerm)
    )
  })

  if (loading) {
    return (
      <div style={{ display: "flex" }}>
        <SideNavbar />
        <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: "flex" }}>
      <SideNavbar />

      <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
        {alert.show && (
          <Alert
            variant={alert.variant}
            dismissible
            onClose={() => setAlert({ show: false, message: "", variant: "success" })}
          >
            {alert.message}
          </Alert>
        )}

        {/* Page Heading and Action Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1>Loan Management</h1>
            <p className="text-muted">Search and manage book loans ({loans.length} total loans)</p>
          </div>
          <Button variant="success" className="px-4" onClick={() => setShowAdd(true)}>
            Add New Loan
          </Button>
        </div>

        {/* Search Bar + Status Dropdown */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup style={{ flex: "1" }}>
            <Form.Control
              type="text"
              placeholder="Search loans by Book Title, Author, Member Name, or Loan ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>

          <DropdownButton id="dropdown-loan-status" title={filterStatus} variant="outline-secondary">
            <Dropdown.Item onClick={() => setFilterStatus("All Status")}>All Status</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterStatus("Active")}>Active</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterStatus("Returned")}>Returned</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterStatus("Overdue")}>Overdue</Dropdown.Item>
          </DropdownButton>
        </div>

        {search && (
          <p className="text-muted mb-3">
            Found {visibleLoans.length} loan{visibleLoans.length !== 1 ? "s" : ""} matching "{search}"
          </p>
        )}

        {/* Loan Cards */}
        <div className="d-flex flex-wrap gap-3">
          {visibleLoans.length > 0 ? (
            visibleLoans.map((loan) => (
              <LoanCard key={loan.id} loan={loan} onEdit={handleEditLoan} onDelete={handleDeleteLoan} />
            ))
          ) : (
            <div className="text-center w-100 py-5">
              <p className="text-muted">No loans found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Loan Modal */}
      <AddLoanModal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onSave={handleAddLoan}
        books={books}
        users={users}
      />

      <EditLoanModal
        show={showEdit}
        onHide={() => {
          setShowEdit(false)
          setEditingLoan(null)
        }}
        onSave={handleUpdateLoan}
        loan={editingLoan}
        books={books}
        users={users}
      />
    </div>
  )
}
