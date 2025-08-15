import React from 'react'
import SideNavbar from '../components/SideNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BookCard from '../components/BookCard';

export default function BookCatalog() {

      // Sample books data
 const books = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-help',
    publisher: 'Avery',
    copies: 10
  },
  {
    id: 2,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'History',
    publisher: 'Harper',
    copies: 5
  },
  {
    id: 3,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Fiction',
    publisher: 'HarperOne',
    copies: 8
  },
  {
    id: 4,
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'Psychology',
    publisher: 'Farrar, Straus and Giroux',
    copies: 7
  },
  {
    id: 5,
    title: '1984',
    author: 'George Orwell',
    category: 'Fiction',
    publisher: 'Secker & Warburg',
    copies: 12
  },
  {
    id: 6,
    title: 'Educated',
    author: 'Tara Westover',
    category: 'Memoir',
    publisher: 'Random House',
    copies: 6
  },
  {
    id: 7,
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    category: 'Self-help',
    publisher: 'Random House',
    copies: 9
  },
  {
    id: 8,
    title: 'Brief History of Time',
    author: 'Stephen Hawking',
    category: 'Science',
    publisher: 'Bantam',
    copies: 4
  },
  {
    id: 9,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    publisher: 'J.B. Lippincott & Co.',
    copies: 11
  },
  {
    id: 10,
    title: 'Guns, Germs, and Steel',
    author: 'Jared Diamond',
    category: 'History',
    publisher: 'W. W. Norton & Company',
    copies: 5
  }
];



  return (
    <div style={{ display: 'flex' }}>
      {/* Side Navigation */}
      <SideNavbar />

      {/* Main Content */}
      <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
        
        {/* Page Heading and Add Book Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1>Book Catalog</h1>
            <p className="text-muted">
              Discover Your Next Great Read – Explore Our Extensive Catalog
            </p>
          </div>
          <Button variant="success" className="px-4">
            Add New Book
          </Button>
        </div>

        {/* Search and Category Filter */}
        <div className="d-flex gap-2 mb-4">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search books by title or Book ID..."
            />
          </InputGroup>

          <DropdownButton
            id="dropdown-categories"
            title="All Categories"
            variant="outline-secondary"
          >
            <Dropdown.Item>All Categories</Dropdown.Item>
            <Dropdown.Item>Fiction</Dropdown.Item>
            <Dropdown.Item>Science</Dropdown.Item>
            <Dropdown.Item>History</Dropdown.Item>
          </DropdownButton>
        </div>

        {/* Placeholder for books listing */}
        <div className="d-flex flex-wrap gap-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  )
}
