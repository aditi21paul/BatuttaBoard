import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email) return;
    const username = email.split('@')[0];
    localStorage.setItem('currentUser', username);
    navigate('/dashboard');
  };

  return (
    <div id="loginPage" className="container">
      <header>
        <h1>Batutta Board</h1>
      </header>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="password" placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
