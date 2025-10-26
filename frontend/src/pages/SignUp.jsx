import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, role);
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label style={{ display: 'block', marginTop: '10px', marginBottom: '5px' }}>
        Role:
      </label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
      >
        <option value="user">User</option>
        <option value="Student">Student</option>
        <option value="Admin">Admin</option>
      </select>

      <button disabled={isLoading} onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Sign Up
      </button>

      {error && <div className="error">{error}</div>}

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Already have an account?{" "}
        <span
          style={{
            color: "#22577A",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;