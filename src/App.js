import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
import BookCatalog from './pages/BookCatalog';
import Loan from './pages/Loan';
import UserManagement from './pages/UserManagement';
import Authors from './pages/Authors';
import Publishers from './pages/Publishers';
import Categories from './pages/Categories';

function App() {
   //console.log('API URL from env:', process.env.REACT_APP_API_URL);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book-catalog" element={<BookCatalog />} />
        <Route path="/loan-management" element={<Loan />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/publishers" element={<Publishers />} />
      </Routes>
    </Router>
  );
}

export default App;
