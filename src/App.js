import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
import BookCatalog from './pages/BookCatalog';
import Loan from './pages/Loan';

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
      </Routes>
    </Router>
  );
}

export default App;
