import React from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import "../App.css";

const DisplaySelectedRoast = ({ roast, onVote }) => {
  if (!roast) {
    return (
      <div className="no-selection">
        <center>Please select a roast or create one!</center>
      </div>
    );
  }

  const linkedinShareUrl = new URL("/feed/", "https://www.linkedin.com");
  linkedinShareUrl.searchParams.append("shareActive", "true");
  linkedinShareUrl.searchParams.append("text", `${roast.roast}`);

  const twitterShareUrl = new URL("https://twitter.com/intent/tweet");
  twitterShareUrl.searchParams.append("text", roast.roast);
  twitterShareUrl.searchParams.append("url", window.location.href);

  const handleVote = () => {
    onVote(roast._id);
  };

  return (
    <div className="selected-roast">
      <h2>{roast.name}</h2>
      <img
        src={roast.picture || "/src/assets/no-profile.png"}
        alt={roast.name}
      />
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
        <br />
        <div className="share-button-container">
          <a
            href={linkedinShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-share-button"
          >
            <FaLinkedin size={20} style={{ marginRight: "8px" }} />
            Share
          </a>
        </div>
        <div className="share-button-container">
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="twitter-share-button"
          >
            <FaTwitter size={20} style={{ marginRight: "8px" }} />
            Share
          </a>
        </div>
        <br />
      </div>
    </div>
  );
};

export default DisplaySelectedRoast;
