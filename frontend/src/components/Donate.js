import React, { useState } from "react";
import "./Donate.css";

export const Donate = ({ addDonation }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [donationDetails, setDonationDetails] = useState({
    title: "",
    description: "",
    quantity: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationDetails({ ...donationDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDonation(donationDetails);
    setDonationDetails({ title: "", description: "", quantity: "" });
    setIsFormVisible(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2000); // Hide message after 1 second
  };

  return (
    <div className="donate-container">
	<p>Add your donations here!!!</p>
      <button className="add-donation-btn" onClick={() => setIsFormVisible(!isFormVisible)}>
        +
      </button>
      {isFormVisible && (
        <form className="donation-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Donation Title"
            value={donationDetails.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={donationDetails.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={donationDetails.quantity}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="submit-btn">Add Donation</button>
        </form>
      )}
      {showSuccessMessage && <p className="success-message">Donation added successfully!</p>}
    </div>
  );
};