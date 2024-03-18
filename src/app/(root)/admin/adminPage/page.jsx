// pages/admin.js
"use client";
import React, { useState } from "react";
import votingSystemContract from "../../constants/contract";

function AdminPage() {
  const [newCandidateName, setNewCandidateName] = useState("");

  const handleAddCandidate = async () => {
    try {
      await votingSystemContract.methods
        .addCandidate(newCandidateName)
        .send({ from: window.ethereum.selectedAddress });
      setNewCandidateName("");
      alert("Candidate added successfully!");
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert("Error adding candidate. Please try again.");
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <label htmlFor="newCandidateName">New Candidate Name:</label>
      <input
        type="text"
        id="newCandidateName"
        value={newCandidateName}
        onChange={(e) => setNewCandidateName(e.target.value)}
        required
      />
      <button onClick={handleAddCandidate}>Add Candidate</button>
    </div>
  );
}

export default AdminPage;
