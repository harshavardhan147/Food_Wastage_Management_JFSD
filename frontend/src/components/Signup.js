import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import styles

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", formData);
      setMessage("Signup successful!");
      setIsSuccess(true);
      setTimeout(() => navigate("/signin"), 2000); // Redirect after 2 seconds
    } catch (error) {
      setMessage(error.response?.data || "Signup failed!");
      setIsSuccess(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Signup to Get Started!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
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
        <button type="submit">Signup</button>
      </form>
      <p className={isSuccess ? "message-success" : "message-error"}>{message}</p>
	  <div className="redirect-link">
	    <p>
	      Already have an account? <a href="/signin">Sign in</a>
	    </p>
	  </div>
    </div>
  );
};

export default Signup;