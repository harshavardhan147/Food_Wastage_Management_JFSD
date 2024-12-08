import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Add CSS for styling

export const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header>
      <div className="left">
        <h1>Food Donation Project</h1>
      </div>
      <div className="right">
        {isLoggedIn ? (
          <>
            <Link to="/donate" className="nav-link">Donate Food</Link>
            <Link to="/request" className="nav-link">Request Food</Link>
            <Link to="/view-donations" className="nav-link">View Donations</Link>
            <Link to="/view-requests" className="nav-link">View Requests</Link>
			<Link to="/feedback" className="nav-link">Feedback</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin" className="nav-link">Sign In</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;