// Mock API functions for user management with localStorage persistence

// Generate unique ID for new users
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Get all users from localStorage
export const getUsers = () => {
  try {
    const users = localStorage.getItem("library_users")
    if (users) {
      return JSON.parse(users)
    }
    // Default users if none exist
    const defaultUsers = [
      {
        id: "1",
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "Admin",
        status: "Active",
        joinDate: "2024-01-15",
      },
      {
        id: "2",
        name: "Bob Smith",
        email: "bob@example.com",
        role: "Librarian",
        status: "Inactive",
        joinDate: "2024-02-20",
      },
      {
        id: "3",
        name: "Charlie Brown",
        email: "charlie@example.com",
        role: "Member",
        status: "Active",
        joinDate: "2024-03-10",
      },
    ]
    localStorage.setItem("library_users", JSON.stringify(defaultUsers))
    return defaultUsers
  } catch (error) {
    console.error("Error getting users:", error)
    return []
  }
}

// Add new user
export const addUser = (userData) => {
  try {
    const users = getUsers()
    const newUser = {
      id: generateId(),
      ...userData,
      status: userData.status || "Active",
      joinDate: new Date().toISOString().split("T")[0],
    }
    users.push(newUser)
    localStorage.setItem("library_users", JSON.stringify(users))
    return { success: true, user: newUser }
  } catch (error) {
    console.error("Error adding user:", error)
    return { success: false, error: error.message }
  }
}

// Update existing user
export const updateUser = (id, userData) => {
  try {
    const users = getUsers()
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex === -1) {
      return { success: false, error: "User not found" }
    }
    users[userIndex] = { ...users[userIndex], ...userData }
    localStorage.setItem("library_users", JSON.stringify(users))
    return { success: true, user: users[userIndex] }
  } catch (error) {
    console.error("Error updating user:", error)
    return { success: false, error: error.message }
  }
}

// Delete user
export const deleteUser = (id) => {
  try {
    const users = getUsers()
    const filteredUsers = users.filter((user) => user.id !== id)
    if (filteredUsers.length === users.length) {
      return { success: false, error: "User not found" }
    }
    localStorage.setItem("library_users", JSON.stringify(filteredUsers))
    return { success: true }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { success: false, error: error.message }
  }
}

// Search users
export const searchUsers = (query) => {
  try {
    const users = getUsers()
    if (!query) return users

    const searchTerm = query.toLowerCase()
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm) ||
        user.id.toLowerCase().includes(searchTerm),
    )
  } catch (error) {
    console.error("Error searching users:", error)
    return []
  }
}

// Filter users by role
export const filterUsersByRole = (role) => {
  try {
    const users = getUsers()
    if (!role || role === "All Roles") return users
    return users.filter((user) => user.role === role)
  } catch (error) {
    console.error("Error filtering users:", error)
    return []
  }
}
