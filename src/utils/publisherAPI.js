// Mock API functions for publisher management with localStorage persistence

// Get all publishers from localStorage
export const getAllPublishers = () => {
  try {
    const publishers = localStorage.getItem("publishers")
    return publishers
      ? JSON.parse(publishers)
      : [
          {
            id: 1,
            name: "Avery",
            address: "New York, USA",
          },
          {
            id: 2,
            name: "Harper",
            address: "London, UK",
          },
          {
            id: 3,
            name: "Random House",
            address: "New York, USA",
          },
        ]
  } catch (error) {
    console.error("Error loading publishers:", error)
    return []
  }
}

// Save publishers to localStorage
const savePublishers = (publishers) => {
  try {
    localStorage.setItem("publishers", JSON.stringify(publishers))
  } catch (error) {
    console.error("Error saving publishers:", error)
  }
}

// Add new publisher
export const addPublisher = (publisherData) => {
  try {
    const publishers = getAllPublishers()
    const newPublisher = {
      id: Date.now(), // Simple ID generation
      ...publisherData,
      createdAt: new Date().toISOString(),
    }

    const updatedPublishers = [...publishers, newPublisher]
    savePublishers(updatedPublishers)
    return { success: true, data: newPublisher }
  } catch (error) {
    console.error("Error adding publisher:", error)
    return { success: false, error: error.message }
  }
}

// Update existing publisher
export const updatePublisher = (id, publisherData) => {
  try {
    const publishers = getAllPublishers()
    const publisherIndex = publishers.findIndex((p) => p.id === Number.parseInt(id))

    if (publisherIndex === -1) {
      return { success: false, error: "Publisher not found" }
    }

    publishers[publisherIndex] = {
      ...publishers[publisherIndex],
      ...publisherData,
      updatedAt: new Date().toISOString(),
    }

    savePublishers(publishers)
    return { success: true, data: publishers[publisherIndex] }
  } catch (error) {
    console.error("Error updating publisher:", error)
    return { success: false, error: error.message }
  }
}

// Delete publisher
export const deletePublisher = (id) => {
  try {
    const publishers = getAllPublishers()
    const filteredPublishers = publishers.filter((p) => p.id !== Number.parseInt(id))

    if (publishers.length === filteredPublishers.length) {
      return { success: false, error: "Publisher not found" }
    }

    savePublishers(filteredPublishers)
    return { success: true }
  } catch (error) {
    console.error("Error deleting publisher:", error)
    return { success: false, error: error.message }
  }
}

// Search publishers by name, address, or ID
export const searchPublishers = (searchTerm) => {
  try {
    const publishers = getAllPublishers()

    if (!searchTerm.trim()) {
      return publishers
    }

    const term = searchTerm.toLowerCase()
    return publishers.filter(
      (publisher) =>
        publisher.name.toLowerCase().includes(term) ||
        publisher.address.toLowerCase().includes(term) ||
        publisher.id.toString().includes(term),
    )
  } catch (error) {
    console.error("Error searching publishers:", error)
    return []
  }
}

