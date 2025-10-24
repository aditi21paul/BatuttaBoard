import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    dob: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = () => {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.dob ||
      !formData.role
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Store user data (in a real app, this would go to a backend)
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if user already exists
    if (users.find((u) => u.email === formData.email)) {
      alert("User already exists with this email");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", formData.username);

    navigate("/dashboard");
  };

  return (
    <div id="signUpPage" className="container">
      <header>
        <h1>Batutta Board</h1>
      </header>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dob"
        placeholder="Date of Birth"
        value={formData.dob}
        onChange={handleChange}
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="">Select Role</option>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>

      <button onClick={handleSignUp}>Sign Up</button>
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
}
