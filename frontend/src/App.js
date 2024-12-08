import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { Donate } from "./components/Donate";
import { Request } from "./components/Request";
import { ViewDonations } from "./components/ViewDonations";
import { ViewRequests } from "./components/ViewRequests";
import { Feedback } from "./components/Feedback";
import { Profile } from "./components/Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // Add donation to the state
  const addDonation = (donation) => {
    setDonations([...donations, donation]);
  };

  // Delete donation from the state
  const deleteDonation = (index) => {
    setDonations(donations.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {/* Redirect to home if logged in, else redirect to signin */}
        <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/signin"} />} />

        {/* Home Page */}
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/signin" />} />

        {/* Authentication Pages */}
        <Route path="/signin" element={!isLoggedIn ? <Signin onLogin={handleLogin} /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/home" />} />

        {/* Protected Routes */}
        <Route
          path="/donate"
          element={isLoggedIn ? <Donate addDonation={addDonation} /> : <Navigate to="/signin" />}
        />
        <Route
          path="/view-donations"
          element={
            isLoggedIn ? (
              <ViewDonations donations={donations} deleteDonation={deleteDonation} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route path="/request" element={isLoggedIn ? <Request /> : <Navigate to="/signin" />} />
        <Route path="/view-requests" element={isLoggedIn ? <ViewRequests /> : <Navigate to="/signin" />} />
        <Route path="/feedback" element={isLoggedIn ? <Feedback /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;