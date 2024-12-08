import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Profile = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); // For loading state

  const userEmail = 'user@example.com'; // Replace with actual email after login

  useEffect(() => {
    // Fetch user profile when component mounts
    axios
      .get(`/api/auth/profile/${userEmail}`) // Use backticks for interpolation
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
        setMessage('Failed to load profile');
        setIsLoading(false);
      });
  }, []);

  const handleUsernameChange = (e) => setNewUsername(e.target.value);
  const handlePasswordChange = (e) => setNewPassword(e.target.value);

  const updateUsername = () => {
    if (!newUsername) {
      setMessage('Username cannot be empty');
      return;
    }
    axios
      .put(`/api/auth/update-username/${userEmail}`, { username: newUsername }) // Use backticks for interpolation
      .then((response) => {
        setMessage('Username updated successfully');
        setUser({ ...user, username: newUsername });
      })
      .catch((error) => {
        setMessage('Error updating username');
      });
  };

  const updatePassword = () => {
    if (!newPassword) {
      setMessage('Password cannot be empty');
      return;
    }
    axios
      .put(`/api/auth/update-password/${userEmail}`, { password: newPassword }) // Use backticks for interpolation
      .then((response) => {
        setMessage('Password updated successfully');
      })
      .catch((error) => {
        setMessage('Error updating password');
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
      </div>

      <div className="update-form">
        <div className="input-group">
          <label>Update Username</label>
          <input
            type="text"
            value={newUsername}
            onChange={handleUsernameChange}
            placeholder="Enter new username"
          />
          <button onClick={updateUsername}>Update Username</button>
        </div>

        <div className="input-group">
          <label>Update Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
          />
          <button onClick={updatePassword}>Update Password</button>
        </div>
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Profile;
