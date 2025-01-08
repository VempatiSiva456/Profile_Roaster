import React from "react";
import "../App.css";

const RoastItem = ({ roast, onVote, onClick }) => {
  const handleVote = () => {
    onVote(roast._id);
  };

  return (
    <div className="roast-item">
      <img src={roast.picture || "/src/assets/no-profile.png"} alt={roast.name} />
      <div onClick={() => onClick(roast)} style={{ cursor: "pointer", fontWeight: "bold" }}>
        <h2>{roast.name}</h2>
      </div>
      <p style={{ fontStyle: "italic" }}>{roast.shortRoast}</p>

      <div className="roast-actions">
        <button
          onClick={handleVote}
          style={{
            backgroundColor: roast.hasVoted ? "#4CAF50" : "#ffffff",
            color: roast.hasVoted ? "white" : "black",
          }}
        >
          👍
        </button>
        <span> {roast.voteCount} votes</span>
      </div>
    </div>
  );
};

export default RoastItem;
