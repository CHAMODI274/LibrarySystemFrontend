// Mock API functions for book management
// These simulate backend operations using localStorage for persistence

const STORAGE_KEY = "libraryBooks"

// Mock delay to simulate network requests
const mockDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

// Get all books from localStorage
export const getAllBooks = async () => {
  await mockDelay()
  const books = localStorage.getItem(STORAGE_KEY)
  return books ? JSON.parse(books) : []
}

// Get a single book by ID
export const getBookById = async (id) => {
  await mockDelay()
  const books = await getAllBooks()
  return books.find((book) => book.id === id) || null
}

// Add a new book
export const addBook = async (bookData) => {
  await mockDelay()
  const books = await getAllBooks()
  const newBook = {
    ...bookData,
    id: Date.now(), // Simple ID generation
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const updatedBooks = [...books, newBook]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks))
  return newBook
}

// Update an existing book
export const updateBook = async (id, bookData) => {
  await mockDelay()
  const books = await getAllBooks()
  const bookIndex = books.findIndex((book) => book.id === id)

  if (bookIndex === -1) {
    throw new Error("Book not found")
  }

  const updatedBook = {
    ...books[bookIndex],
    ...bookData,
    updatedAt: new Date().toISOString(),
  }

  books[bookIndex] = updatedBook
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
  return updatedBook
}

// Delete a book
export const deleteBook = async (id) => {
  await mockDelay()
  const books = await getAllBooks()
  const filteredBooks = books.filter((book) => book.id !== id)

  if (books.length === filteredBooks.length) {
    throw new Error("Book not found")
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredBooks))
  return { success: true, message: "Book deleted successfully" }
}

// Search books by title or author
export const searchBooks = async (query) => {
  await mockDelay()
  const books = await getAllBooks()
  const lowercaseQuery = query.toLowerCase()

  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(lowercaseQuery) ||
      (book.author && book.author.toLowerCase().includes(lowercaseQuery)),
  )
}

// Filter books by category
export const getBooksByCategory = async (categoryId) => {
  await mockDelay()
  const books = await getAllBooks()
  return books.filter((book) => book.categoryId === categoryId)
}

// Get books with pagination
export const getBooksWithPagination = async (page = 1, limit = 10) => {
  await mockDelay()
  const books = await getAllBooks()
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return {
    books: books.slice(startIndex, endIndex),
    totalBooks: books.length,
    currentPage: page,
    totalPages: Math.ceil(books.length / limit),
    hasNextPage: endIndex < books.length,
    hasPrevPage: page > 1,
  }
}
