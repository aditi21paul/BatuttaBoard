import React from 'react';
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

function Header({ user }) {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleMenuChange = (e) => {
    const value = e.target.value;

    if (value === "logout") {
      logout();
    } else if (value === "personal") {
      navigate("/trips/user/me");
    }
    else if (value == "home") {
      navigate("/");
    }
  };

  return (
    <header>
      {user && (
        <div className="menu">
          <select onChange={handleMenuChange}>
            <option value="">☰ Menu</option>
            <option value="personal">Personal Dashboard</option>
            <option value="home">Homepage</option>
            <option value="logout">Logout</option>
          </select>
        </div>
      )}
      <h1>Batutta Board</h1>
    </header>
  );
}

export default Header;