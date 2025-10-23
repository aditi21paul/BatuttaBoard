import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <header>
        <h1>Welcome to Batutta Board</h1>
      </header>
      <p>Find fellow travelers, share your journey, and connect across destinations.</p>
      <button onClick={() => navigate("/login")}>Login to Continue</button>
    </div>
  );
}
