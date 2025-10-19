import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './components/Dashboard';
import PersonalDashboard from './pages/PersonalDashboard';

export default function App() {
  const currentUser = localStorage.getItem('currentUser');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/dashboard" />} />
        <Route path="/personal" element={currentUser ? <PersonalDashboard /> : <Navigate to="/PersonalDasboard" />} />
      </Routes>
    </Router>
  );
}
