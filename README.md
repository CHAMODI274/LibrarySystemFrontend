# Library Management System

A comprehensive React.js-based library management system with mock authentication and full CRUD operations for managing books, loans, users, authors, categories, and publishers.

## Features

### Authentication System
- **Mock Authentication**: Sign-in and sign-up functionality with localStorage persistence
- **User Sessions**: Automatic navigation to dashboard after authentication
- **Secure Logout**: Clear user data and redirect to home page

### Management Modules

#### 📚 Book Management
- Display all books with detailed information (title, author, ISBN, copies, category)
- Add new books with comprehensive details
- Edit existing book information
- Delete books from the catalog
- Search books by title, author, or ISBN
- Filter books by category

#### 👥 User Management
- Manage library users with role-based access (Admin/Users)
- Add new users with contact information
- Edit user profiles and roles
- Delete user accounts
- Search users by name, email, or ID
- Filter users by role

#### 📖 Loan Management
- Track book loans with borrower and due date information
- Create new loan records
- Edit loan details and extend due dates
- Delete loan records
- Search loans by borrower, book title, or loan ID
- Automatic overdue status detection

#### ✍️ Author Management
- Maintain author database with biographical information
- Add new authors with nationality and birth year
- Edit author profiles
- Remove authors from database
- Search authors by name, nationality, or biography

#### 🏷️ Category Management
- Organize books by categories
- Add new categories with descriptions
- Edit category information
- Delete categories
- Search categories by ID or name
- Backend API integration with localStorage fallback

#### 🏢 Publisher Management
- Manage publisher information
- Add new publishers with name and address
- Edit publisher details
- Delete publisher records
- Search publishers by name or address

## Technology Stack

- **Frontend**: React.js with functional components
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: localStorage for client-side storage
- **Routing**: React Router for navigation
- **Styling**: Bootstrap CSS framework
- **API Layer**: Mock API functions with localStorage integration

## Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd library-management-system
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
\`\`\`

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Getting Started
1. **Sign Up**: Create a new account or use existing credentials
2. **Sign In**: Access the dashboard with your credentials
3. **Navigate**: Use the sidebar to access different management modules

### Managing Data
- **Add**: Click the "Add New" button in any module to create records
- **Edit**: Click the edit icon on any card to modify information
- **Delete**: Click the delete icon to remove records (with confirmation)
- **Search**: Use the search bar to find specific records
- **Filter**: Apply filters where available to narrow down results

## Project Structure

\`\`\`
src/
├── components/           # Reusable React components
│   ├── BookCard.js      # Book display component
│   ├── UserCard.js      # User display component
│   ├── LoanCard.js      # Loan display component
│   ├── AuthorCard.js    # Author display component
│   ├── CategoryCard.js  # Category display component
│   ├── PublisherCard.js # Publisher display component
│   ├── *Modal.js        # Modal components for CRUD operations
│   ├── Navbar.js        # Navigation bar with auth state
│   └── SideNavbar.js    # Sidebar navigation
├── pages/               # Main page components
│   ├── Dashboard.js     # Main dashboard
│   ├── BookCatalog.js   # Books management page
│   ├── UserManagement.js# Users management page
│   ├── Loan.js          # Loans management page
│   ├── Authors.js       # Authors management page
│   ├── Categories.js    # Categories management page
│   └── Publishers.js    # Publishers management page
├── utils/               # API utilities and helpers
│   ├── bookAPI.js       # Book management API
│   ├── userAPI.js       # User management API
│   ├── loanAPI.js       # Loan management API
│   ├── authorAPI.js     # Author management API
│   ├── categoryAPI.js   # Category management API
│   └── publisherAPI.js  # Publisher management API
└── assets/              # Static assets and images
\`\`\`

## API Integration

The system includes mock API functions that simulate backend operations:

- **localStorage Persistence**: All data is stored locally in the browser
- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Search Capabilities**: Real-time search across multiple fields
- **Error Handling**: Comprehensive error handling with user feedback
- **Loading States**: Visual feedback during operations

## Features in Detail

### Authentication Flow
1. Users can sign up with email and password
2. Sign-in validates credentials against localStorage
3. Successful authentication redirects to dashboard
4. User session persists across browser refreshes
5. Logout clears session and redirects to home

### Data Management
- **Real-time Search**: Instant filtering as you type
- **Form Validation**: Client-side validation for all forms
- **Confirmation Dialogs**: Safe deletion with user confirmation
- **Success/Error Alerts**: User feedback for all operations
- **Responsive Design**: Works on desktop and mobile devices



