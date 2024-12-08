import React from "react";
import "./ViewDonations.css";
export const ViewDonations = ({ donations, deleteDonation }) => {
  return (
    <div className="view-donations-page">
      {donations.length > 0 ? (
        donations.map((donation, index) => (
          <div className="donation-item" key={index}>
            <h3>{donation.title}</h3>
            <button className="delete-button" onClick={() => deleteDonation(index)}>
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No donations to display.</p>
      )}
    </div>
  );
};