import React, { useState, useEffect, useRef } from "react";
import RoastForm from "./components/RoastForm";
import RoastList from "./components/RoastList";
import DisplaySelectedRoast from "./components/DisplaySelectedRoast";
import { getRoasts, toggleVote } from "./api";
import { useTheme } from "./contexts/ThemeContext";
import "./App.css";

const App = () => {
  const [roasts, setRoasts] = useState([]);
  const [selectedRoast, setSelectedRoast] = useState(null);
  const [sortByVotes, setSortByVotes] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const displayRef = useRef(null);

  const { isDarkMode, toggleTheme } = useTheme(); 

  const fetchRoasts = async () => {
    const response = await getRoasts();
    if (response.success) {
      setRoasts(response.roasts);
    } else {
      console.error("Failed to fetch roasts:", response.message);
    }
  };

  const handleVoteToggle = async (roastId) => {
    try {
      const response = await toggleVote(roastId);
      if (response.success) {
        setRoasts((prevRoasts) =>
          prevRoasts.map((roast) =>
            roast._id === roastId
              ? {
                  ...roast,
                  voteCount: roast.voteCount + (roast.hasVoted ? -1 : 1),
                  hasVoted: !roast.hasVoted,
                }
              : roast
          )
        );

        if (selectedRoast && selectedRoast._id === roastId) {
          setSelectedRoast((prev) => ({
            ...prev,
            voteCount: prev.voteCount + (prev.hasVoted ? -1 : 1),
            hasVoted: !prev.hasVoted,
          }));
        }
      } else {
        console.error("Failed to vote:", response.message);
      }
    } catch (err) {
      console.error("Error voting:", err.message);
    }
  };

  const handleRoastSelect = (roast) => {
    setSelectedRoast(roast);
    displayRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredRoasts = roasts
    .filter((roast) =>
      roast.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortByVotes ? b.voteCount - a.voteCount : b.date - a.date));

  useEffect(() => {
    fetchRoasts();
  }, []);

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <br></br>
      <br></br>
      <h1>😎 LinkedIn Roast Generator 🔥</h1>
      <RoastForm onRoastCreated={fetchRoasts} setSelectedRoast={setSelectedRoast} />

      <div ref={displayRef}>
        <DisplaySelectedRoast roast={selectedRoast} onVote={handleVoteToggle} />
      </div>

      <br></br>
      <br></br>

      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "20px" }}
        />
      </div>

      <div className="toggle-buttons">
        <button
          className={`toggle-option ${sortByVotes ? "active" : ""}`}
          onClick={() => setSortByVotes(true)}
        >
          Top 🔥
        </button>
        <button
          className={`toggle-option ${!sortByVotes ? "active" : ""}`}
          onClick={() => setSortByVotes(false)}
        >
          Recent 🕶
        </button>
        <div
          className="slider"
          style={{
            transform: sortByVotes ? "translateX(0)" : "translateX(100%)",
          }}
        ></div>
      </div>

      <RoastList
        roasts={filteredRoasts}
        onVote={handleVoteToggle}
        onRoastClick={handleRoastSelect}
      />

      <br></br>
      <br></br>

      <button onClick={toggleTheme} className="theme-toggle">
        {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
};

export default App;
