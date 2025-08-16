// Mock API functions for author management with localStorage persistence

// Generate unique ID for new authors
const generateId = () => {
  const authors = JSON.parse(localStorage.getItem("authors") || "[]")
  return authors.length > 0 ? Math.max(...authors.map((a) => a.id)) + 1 : 1
}

// Initialize default authors if none exist
const initializeAuthors = () => {
  const existingAuthors = localStorage.getItem("authors")
  if (!existingAuthors) {
    const defaultAuthors = [
      {
        id: 1,
        name: "James Clear",
        bio: "James Clear is an author and speaker focused on habits, decision-making, and continuous improvement.",
        nationality: "American",
        birthYear: 1986,
      },
      {
        id: 2,
        name: "Yuval Noah Harari",
        bio: 'Yuval Noah Harari is a historian and philosopher, best known for his book "Sapiens" exploring human history.',
        nationality: "Israeli",
        birthYear: 1976,
      },
      {
        id: 3,
        name: "Paulo Coelho",
        bio: 'Paulo Coelho is a Brazilian lyricist and novelist, best known for his novel "The Alchemist".',
        nationality: "Brazilian",
        birthYear: 1947,
      },
    ]
    localStorage.setItem("authors", JSON.stringify(defaultAuthors))
  }
}

// Fetch all authors
export const fetchAuthors = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      initializeAuthors()
      const authors = JSON.parse(localStorage.getItem("authors") || "[]")
      resolve(authors)
    }, 300)
  })
}

// Add new author
export const addAuthor = (authorData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const authors = JSON.parse(localStorage.getItem("authors") || "[]")
        const newAuthor = {
          id: generateId(),
          ...authorData,
          createdAt: new Date().toISOString(),
        }
        authors.push(newAuthor)
        localStorage.setItem("authors", JSON.stringify(authors))
        resolve(newAuthor)
      } catch (error) {
        reject(error)
      }
    }, 300)
  })
}

// Update existing author
export const updateAuthor = (id, authorData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const authors = JSON.parse(localStorage.getItem("authors") || "[]")
        const index = authors.findIndex((author) => author.id === id)
        if (index !== -1) {
          authors[index] = { ...authors[index], ...authorData, updatedAt: new Date().toISOString() }
          localStorage.setItem("authors", JSON.stringify(authors))
          resolve(authors[index])
        } else {
          reject(new Error("Author not found"))
        }
      } catch (error) {
        reject(error)
      }
    }, 300)
  })
}

// Delete author
export const deleteAuthor = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const authors = JSON.parse(localStorage.getItem("authors") || "[]")
        const filteredAuthors = authors.filter((author) => author.id !== id)
        if (filteredAuthors.length < authors.length) {
          localStorage.setItem("authors", JSON.stringify(filteredAuthors))
          resolve(true)
        } else {
          reject(new Error("Author not found"))
        }
      } catch (error) {
        reject(error)
      }
    }, 300)
  })
}

// Search authors
export const searchAuthors = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const authors = JSON.parse(localStorage.getItem("authors") || "[]")
      const filteredAuthors = authors.filter(
        (author) =>
          author.name.toLowerCase().includes(query.toLowerCase()) ||
          author.bio.toLowerCase().includes(query.toLowerCase()) ||
          (author.nationality && author.nationality.toLowerCase().includes(query.toLowerCase())) ||
          author.id.toString().includes(query),
      )
      resolve(filteredAuthors)
    }, 300)
  })
}
