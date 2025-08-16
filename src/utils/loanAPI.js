// Mock API functions for loan management with localStorage persistence

const LOANS_STORAGE_KEY = "library_loans"
const BOOKS_STORAGE_KEY = "library_books"
const USERS_STORAGE_KEY = "library_users"

// Initialize default data
const initializeDefaultData = () => {
  // Default books
  const defaultBooks = [
    { id: 1, title: "Atomic Habits", author: "James Clear", isbn: "978-0735211292", copies: 5 },
    { id: 2, title: "Sapiens", author: "Yuval Noah Harari", isbn: "978-0062316097", copies: 3 },
    { id: 3, title: "The Alchemist", author: "Paulo Coelho", isbn: "978-0062315007", copies: 4 },
    { id: 4, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", isbn: "978-0374533557", copies: 2 },
  ]

  // Default users
  const defaultUsers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Sam Green", email: "sam@example.com" },
  ]

  // Default loans
  const defaultLoans = [
    {
      id: 1,
      bookId: 1,
      memberId: 1,
      loanDate: "2025-08-01",
      dueDate: "2025-08-15",
      returnDate: null,
      status: "Active",
    },
    {
      id: 2,
      bookId: 2,
      memberId: 2,
      loanDate: "2025-07-10",
      dueDate: "2025-07-24",
      returnDate: "2025-07-20",
      status: "Returned",
    },
    {
      id: 3,
      bookId: 3,
      memberId: 3,
      loanDate: "2025-07-20",
      dueDate: "2025-08-03",
      returnDate: null,
      status: "Overdue",
    },
  ]

  // Initialize if not exists
  if (!localStorage.getItem(BOOKS_STORAGE_KEY)) {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(defaultBooks))
  }
  if (!localStorage.getItem(USERS_STORAGE_KEY)) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers))
  }
  if (!localStorage.getItem(LOANS_STORAGE_KEY)) {
    localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(defaultLoans))
  }
}

// Helper function to get data from localStorage
const getFromStorage = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : defaultValue
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error)
    return defaultValue
  }
}

// Helper function to save data to localStorage
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error)
  }
}

// Simulate API delay
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

// Loan API functions
export const loanAPI = {
  // Get all loans
  async getLoans() {
    await delay()
    initializeDefaultData()
    const loans = getFromStorage(LOANS_STORAGE_KEY)
    const books = getFromStorage(BOOKS_STORAGE_KEY)
    const users = getFromStorage(USERS_STORAGE_KEY)

    // Expand loans with book and user details
    const expandedLoans = loans.map((loan) => {
      const book = books.find((b) => b.id === loan.bookId) || { title: "Unknown Book", author: "Unknown Author" }
      const user = users.find((u) => u.id === loan.memberId) || { name: "Unknown User" }

      return {
        ...loan,
        bookTitle: book.title,
        bookAuthor: book.author,
        borrowerName: user.name,
        borrowerEmail: user.email,
      }
    })

    return expandedLoans
  },

  // Add new loan
  async addLoan(loanData) {
    await delay()
    const loans = getFromStorage(LOANS_STORAGE_KEY)
    const newLoan = {
      ...loanData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }

    const updatedLoans = [...loans, newLoan]
    saveToStorage(LOANS_STORAGE_KEY, updatedLoans)

    return newLoan
  },

  // Update loan
  async updateLoan(id, updates) {
    await delay()
    const loans = getFromStorage(LOANS_STORAGE_KEY)
    const loanIndex = loans.findIndex((loan) => loan.id === id)

    if (loanIndex === -1) {
      throw new Error("Loan not found")
    }

    loans[loanIndex] = { ...loans[loanIndex], ...updates, updatedAt: new Date().toISOString() }
    saveToStorage(LOANS_STORAGE_KEY, loans)

    return loans[loanIndex]
  },

  // Delete loan
  async deleteLoan(id) {
    await delay()
    const loans = getFromStorage(LOANS_STORAGE_KEY)
    const filteredLoans = loans.filter((loan) => loan.id !== id)

    if (loans.length === filteredLoans.length) {
      throw new Error("Loan not found")
    }

    saveToStorage(LOANS_STORAGE_KEY, filteredLoans)
    return { success: true }
  },

  // Search loans
  async searchLoans(query) {
    await delay()
    const loans = await this.getLoans()

    if (!query) return loans

    const searchTerm = query.toLowerCase()
    return loans.filter(
      (loan) =>
        loan.bookTitle.toLowerCase().includes(searchTerm) ||
        loan.bookAuthor.toLowerCase().includes(searchTerm) ||
        loan.borrowerName.toLowerCase().includes(searchTerm) ||
        loan.status.toLowerCase().includes(searchTerm) ||
        loan.id.toString().includes(searchTerm),
    )
  },

  // Get books for dropdown
  async getBooks() {
    await delay()
    initializeDefaultData()
    return getFromStorage(BOOKS_STORAGE_KEY)
  },

  // Get users for dropdown
  async getUsers() {
    await delay()
    initializeDefaultData()
    return getFromStorage(USERS_STORAGE_KEY)
  },
}

