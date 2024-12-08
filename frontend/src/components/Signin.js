import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import styles

export const Signin = ({ onLogin }) => {  // Receive onLogin as a prop
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("username", response.data.username);
      setMessage("Signin successful!");
      setIsSuccess(true);
      
      onLogin();  // Call onLogin to update the parent component state
      setTimeout(() => navigate("/home"), 2000); // Redirect to home after 2 seconds
    } catch (error) {
      setMessage(error.response?.data?.message || "Signin failed!");
      setIsSuccess(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>  {/* Fixed button text */}
      </form>
      <p className={isSuccess ? "message-success" : "message-error"}>{message}</p>
      <div className="redirect-link">
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;