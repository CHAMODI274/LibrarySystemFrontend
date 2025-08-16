// Mock API functions for category management with backend API calls
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api"

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock categories data as fallback
const mockCategories = [
  { id: 1, name: "Fiction", description: "Fictional literature and novels", createdAt: "2024-01-15" },
  { id: 2, name: "Science", description: "Scientific books and research", createdAt: "2024-01-16" },
  { id: 3, name: "History", description: "Historical books and documentaries", createdAt: "2024-01-17" },
  { id: 4, name: "Technology", description: "Technology and programming books", createdAt: "2024-01-18" },
  { id: 5, name: "Biography", description: "Biographical and autobiographical works", createdAt: "2024-01-19" },
]

// Get all categories from backend API
export const getAllCategories = async () => {
  try {
    await delay(500) // Simulate network delay

    // Try to fetch from backend API
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return { success: true, data: data.categories || data }
    } else {
      throw new Error(`API Error: ${response.status}`)
    }
  } catch (error) {
    console.warn("Backend API not available, using localStorage:", error.message)

    // Fallback to localStorage
    const storedCategories = localStorage.getItem("categories")
    if (storedCategories) {
      return { success: true, data: JSON.parse(storedCategories) }
    } else {
      // Initialize with mock data
      localStorage.setItem("categories", JSON.stringify(mockCategories))
      return { success: true, data: mockCategories }
    }
  }
}

// Add new category via backend API
export const addCategory = async (categoryData) => {
  try {
    await delay(300)

    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
      },
      body: JSON.stringify(categoryData),
    })

    if (response.ok) {
      const data = await response.json()
      return { success: true, data: data.category || data }
    } else {
      throw new Error(`API Error: ${response.status}`)
    }
  } catch (error) {
    console.warn("Backend API not available, using localStorage:", error.message)

    // Fallback to localStorage
    const storedCategories = JSON.parse(localStorage.getItem("categories") || "[]")
    const newCategory = {
      id: Date.now(),
      ...categoryData,
      createdAt: new Date().toISOString().split("T")[0],
    }

    const updatedCategories = [...storedCategories, newCategory]
    localStorage.setItem("categories", JSON.stringify(updatedCategories))

    return { success: true, data: newCategory }
  }
}

// Update category via backend API
export const updateCategory = async (id, categoryData) => {
  try {
    await delay(300)

    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
      },
      body: JSON.stringify(categoryData),
    })

    if (response.ok) {
      const data = await response.json()
      return { success: true, data: data.category || data }
    } else {
      throw new Error(`API Error: ${response.status}`)
    }
  } catch (error) {
    console.warn("Backend API not available, using localStorage:", error.message)

    // Fallback to localStorage
    const storedCategories = JSON.parse(localStorage.getItem("categories") || "[]")
    const updatedCategories = storedCategories.map((category) =>
      category.id === Number.parseInt(id) ? { ...category, ...categoryData } : category,
    )

    localStorage.setItem("categories", JSON.stringify(updatedCategories))
    const updatedCategory = updatedCategories.find((cat) => cat.id === Number.parseInt(id))

    return { success: true, data: updatedCategory }
  }
}

// Delete category via backend API
export const deleteCategory = async (id) => {
  try {
    await delay(300)

    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
      },
    })

    if (response.ok) {
      return { success: true, message: "Category deleted successfully" }
    } else {
      throw new Error(`API Error: ${response.status}`)
    }
  } catch (error) {
    console.warn("Backend API not available, using localStorage:", error.message)

    // Fallback to localStorage
    const storedCategories = JSON.parse(localStorage.getItem("categories") || "[]")
    const filteredCategories = storedCategories.filter((category) => category.id !== Number.parseInt(id))

    localStorage.setItem("categories", JSON.stringify(filteredCategories))

    return { success: true, message: "Category deleted successfully" }
  }
}

// Search categories via backend API
export const searchCategories = async (searchTerm) => {
  try {
    await delay(200)

    const response = await fetch(`${API_BASE_URL}/categories/search?q=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return { success: true, data: data.categories || data }
    } else {
      throw new Error(`API Error: ${response.status}`)
    }
  } catch (error) {
    console.warn("Backend API not available, using localStorage:", error.message)

    // Fallback to localStorage search
    const storedCategories = JSON.parse(localStorage.getItem("categories") || "[]")
    const filteredCategories = storedCategories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return { success: true, data: filteredCategories }
  }
}