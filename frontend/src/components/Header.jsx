import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const handleMenu = (value) => {
    if (value === 'logout') {
      localStorage.removeItem('currentUser');
      navigate('/login');
    } else if (value === 'personal') {
      navigate('/personal');
    }
  };

  return (
    <header>
      <div className="menu" id="menuContainer" style={{display: 'block'}}>
        <select onChange={(e) => handleMenu(e.target.value)}>
          <option value="">☰ Menu</option>
          <option value="personal">Personal Dashboard</option>
          <option value="logout">Logout</option>
        </select>
      </div>
      <h1>Batutta Board</h1>
    </header>
  );
}
