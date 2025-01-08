import React, { useState } from "react";
import { createRoast } from "../api";
import "../App.css";

const RoastForm = ({ onRoastCreated, setSelectedRoast }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await createRoast(url);
      if (response.success) {
        onRoastCreated();
        setUrl("");
        setSelectedRoast(response.roast);
      } else if (response.message && response.message.includes("already exists")) {
        const existingRoast = response.roast;
        if (existingRoast) {
          setSelectedRoast(existingRoast);
        }
        setError("");
      } else {
        setError(response.message || "Failed to create roast.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Enter LinkedIn Profile URL 😜"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />

      <span>    </span>

      <button type="submit" disabled={loading}>
        {loading ? "Roasting...🤞🏼" : "Roast 🤘🏼"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default RoastForm;
