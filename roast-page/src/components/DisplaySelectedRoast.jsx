import React from "react";
import "../App.css";

const DisplaySelectedRoast = ({ roast, onVote }) => {
  if (!roast) {
    return <div className="no-selection"><center>Please select a roast or create one!</center></div>;
  }

  const handleVote = () => {
    onVote(roast._id);
  };

  return (
    <div className="selected-roast">
      <h2>{roast.name}</h2>
      <img src={roast.picture || "/src/assets/no-profile.png"} alt={roast.name} />
      {roast.roast.split("\n").map((para, index) => (
        <p key={index}>{para}</p>
      ))}
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

export default DisplaySelectedRoast;
