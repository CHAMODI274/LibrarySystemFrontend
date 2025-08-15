import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaBook, FaClipboardList, FaUsers, FaFeatherAlt, FaTags, FaBuilding } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import './SideNavbar.css';

export default function SideNavbar() {
  return (
    <div className="side-navbar">
      <h6 className="panel-title">ADMIN PANEL</h6>
      <NavLink to="/dashboard" className="nav-item">
        <MdDashboard className="icon" /> Dashboard
      </NavLink>
      <NavLink to="/book-catalog" className="nav-item">
        <FaBook className="icon" /> Book Catalog
      </NavLink>
      <NavLink to="/loan-management" className="nav-item">
        <FaClipboardList className="icon" /> Loan Management
      </NavLink>
      <NavLink to="/user-management" className="nav-item">
        <FaUsers className="icon" /> User Management
      </NavLink>
      <NavLink to="/authors" className="nav-item">
        <FaFeatherAlt className="icon" /> Authors
      </NavLink>
      <NavLink to="/categories" className="nav-item">
        <FaTags className="icon" /> Categories
      </NavLink>
      <NavLink to="/publishers" className="nav-item">
        <FaBuilding className="icon" /> Publishers
      </NavLink>
    </div>
  );
}
