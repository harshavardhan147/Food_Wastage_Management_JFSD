import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const isLoggedIn = !!localStorage.getItem("token"); // Check if the user is logged in
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/signin"); // Redirect to signin after logout
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Reduce Food Wastage, Improve Food Security</h2>
        <p>
          Join our mission to combat hunger by donating surplus food or 
          requesting meals for those in need. Every little effort counts, and
          together, we can make a significant impact in helping communities 
          facing food insecurity. Your actions today can create a brighter 
          tomorrow for many.
        </p>
        
        {/* Action Buttons */}
        <div className="food-actions">
          <Link
            to={isLoggedIn ? "/donate" : "#"}
            className={`action-btn ${!isLoggedIn ? "disabled" : ""}`}
          >
            Donate Food
          </Link>
          <Link
            to={isLoggedIn ? "/request" : "#"}
            className={`action-btn ${!isLoggedIn ? "disabled" : ""}`}
          >
            Request Food
          </Link>
        </div>

        {/* Logout Button */}
        {isLoggedIn && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}

        {/* Additional Information Paragraph */}
        <p className="extra-info">
          By choosing to donate food or request meals, you're not just providing food,
          you're giving hope. Help us spread awareness and support a hunger-free world.
        </p>
      </div>
    </div>
  );
};

export default Home;
