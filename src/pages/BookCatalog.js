import React, { useState, useMemo } from 'react';
import SideNavbar from '../components/SideNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BookCard from '../components/BookCard';
import AddBookModal from '../components/AddBookModal';

export default function BookCatalog() {

// === Reference data (authors, publishers, categories) ===
  const authors = [
    { id: 1, name: 'James Clear' },
    { id: 2, name: 'Yuval Noah Harari' },
    { id: 3, name: 'Paulo Coelho' },
    { id: 4, name: 'Daniel Kahneman' },
    { id: 5, name: 'George Orwell' },
    { id: 6, name: 'Tara Westover' },
    { id: 7, name: 'Charles Duhigg' },
    { id: 8, name: 'Stephen Hawking' },
    { id: 9, name: 'Harper Lee' },
    { id: 10, name: 'Jared Diamond' }
  ];

  const publishers = [
    { id: 1, name: 'Avery', address: 'New York, NY' },
    { id: 2, name: 'Harper', address: 'London, UK' },
    { id: 3, name: 'HarperOne', address: 'San Francisco, CA' },
    { id: 4, name: 'Farrar, Straus and Giroux', address: 'New York, NY' },
    { id: 5, name: 'Secker & Warburg', address: 'London, UK' },
    { id: 6, name: 'Random House', address: 'New York, NY' },
    { id: 7, name: 'Bantam', address: 'New York, NY' },
    { id: 8, name: 'J.B. Lippincott & Co.', address: 'Philadelphia, PA' },
    { id: 9, name: 'W. W. Norton & Company', address: 'New York, NY' }
  ];

  const categories = [
    { id: 1, name: 'Self-help' },
    { id: 2, name: 'History' },
    { id: 3, name: 'Fiction' },
    { id: 4, name: 'Psychology' },
    { id: 5, name: 'Memoir' },
    { id: 6, name: 'Science' }
  ];

  // === Initial books (stateful so modal additions update UI) ===
  const initialBooks = [
    { id: 1, title: 'Atomic Habits', authorId: 1, publishedYear: 2018, publisherId: 1, categoryId: 1, isbn: '9780735211292', copies: 10 },
    { id: 2, title: 'Sapiens', authorId: 2, publishedYear: 2015, publisherId: 2, categoryId: 2, isbn: '9780062316097', copies: 5 },
    { id: 3, title: 'The Alchemist', authorId: 3, publishedYear: 1993, publisherId: 3, categoryId: 3, isbn: '9780061122415', copies: 8 },
    { id: 4, title: 'Thinking, Fast and Slow', authorId: 4, publishedYear: 2011, publisherId: 4, categoryId: 4, isbn: '9780374533557', copies: 7 },
    { id: 5, title: '1984', authorId: 5, publishedYear: 1949, publisherId: 5, categoryId: 3, isbn: '9780451524935', copies: 12 },
    { id: 6, title: 'Educated', authorId: 6, publishedYear: 2018, publisherId: 6, categoryId: 5, isbn: '9780399590504', copies: 6 },
    { id: 7, title: 'The Power of Habit', authorId: 7, publishedYear: 2012, publisherId: 6, categoryId: 1, isbn: '9780812981605', copies: 9 },
    { id: 8, title: 'Brief History of Time', authorId: 8, publishedYear: 1988, publisherId: 7, categoryId: 6, isbn: '9780553380163', copies: 4 },
    { id: 9, title: 'To Kill a Mockingbird', authorId: 9, publishedYear: 1960, publisherId: 8, categoryId: 3, isbn: '9780060935467', copies: 11 },
    { id: 10, title: 'Guns, Germs, and Steel', authorId: 10, publishedYear: 1997, publisherId: 9, categoryId: 2, isbn: '9780393317558', copies: 5 }
  ];

  const [books, setBooks] = useState(initialBooks);
  const [showAdd, setShowAdd] = useState(false);

  // Called when AddBookModal provides a new book object (with authorId/publisherId/categoryId)
  const handleAddBook = (newBookWithIds) => {
    // ensure id is unique if AddBookModal used Date.now() already it's fine
    setBooks(prev => [...prev, newBookWithIds]);
    // AddBookModal will call onHide/onClose (it supports those). Also close here if needed:
    setShowAdd(false);
  };

  // compute expandedBooks for rendering BookCard (book.author is expected to be a string)
  const expandedBooks = useMemo(() => {
    return books.map(b => {
      const publisher = publishers.find(p => p.id === b.publisherId) ?? null;
      const category = categories.find(c => c.id === b.categoryId) ?? null;
      const authorObj = authors.find(a => a.id === b.authorId) ?? null;
      return {
        ...b,
        author: authorObj ? authorObj.name : '',
        publisher,
        category
      };
    });
  }, [books, authors, publishers, categories]);

  return (
    <div style={{ display: 'flex' }}>
      {/* Side Navigation */}
      <SideNavbar />

      {/* Main Content */}
      <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
        {/* Heading */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1>Book Catalog</h1>
            <p className="text-muted">Discover Your Next Great Read – Explore Our Extensive Catalog</p>
          </div>
          <Button variant="success" className="px-4" onClick={() => setShowAdd(true)}>Add New Book</Button>
        </div>

        {/* Search and Category Filter */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup style={{ flex: 1 }}>
            <Form.Control type="text" placeholder="Search books by title or Book ID..." />
          </InputGroup>

          <DropdownButton id="dropdown-categories" title="All Categories" variant="outline-secondary">
            <Dropdown.Item>All Categories</Dropdown.Item>
            {categories.map(cat => <Dropdown.Item key={cat.id}>{cat.name}</Dropdown.Item>)}
          </DropdownButton>
        </div>

        {/* Books listing */}
        <div className="d-flex flex-wrap gap-3">
          {expandedBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      {/* Add Book Modal */}
      <AddBookModal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onSave={handleAddBook}
        authors={authors}
        publishers={publishers}
        categories={categories}
      />
    </div>
  );
}