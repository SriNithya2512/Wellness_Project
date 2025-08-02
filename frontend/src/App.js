import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MySessions from './pages/MySessions';
import SessionEditor from './pages/SessionEditor';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 Protected Routes */}
        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } />
        <Route path="/my-sessions" element={
          <RequireAuth>
            <MySessions />
          </RequireAuth>
        } />
        <Route path="/editor" element={
          <RequireAuth>
            <SessionEditor />
          </RequireAuth>
        } />
      </Routes>
    </Router>
  );
}

export default App;
