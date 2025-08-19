import React, { useState } from "react";
import "./Auth.css";
import { registerUser } from "../services/authServices";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      setMessage(`Registration successful! Welcome ${res.user?.name || formData.name}`);
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="ngo">NGO</option>
          <option value="delivery">Delivery</option>
        </select>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
