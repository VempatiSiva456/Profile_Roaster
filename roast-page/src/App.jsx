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
  const [totalRoasts, setTotalRoasts] = useState(0);
  const displayRef = useRef(null);

  const { isDarkMode, toggleTheme } = useTheme(); 

  const fetchRoasts = async () => {
    const response = await getRoasts();
    if (response.success) {
      setRoasts(response.roasts);
      setTotalRoasts(response.roasts.length);
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
  .sort((a, b) => {
    if (sortByVotes) {
      return b.voteCount - a.voteCount; 
    } else {
      const recentTimeA = new Date(a.recent_time);
      const recentTimeB = new Date(b.recent_time);
      return recentTimeB - recentTimeA;
    }
  });


  useEffect(() => {
    fetchRoasts();
  }, []);

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
    <button onClick={toggleTheme} className="theme-toggle">
      {isDarkMode ? "🌞" : "🌙"}
    </button>
      <br></br>
      <center><h2>😎 LinkedIn Roast Generator 🔥</h2></center>
      <RoastForm onRoastCreated={fetchRoasts} setSelectedRoast={setSelectedRoast} />

      <div ref={displayRef}>
        <DisplaySelectedRoast roast={selectedRoast} onVote={handleVoteToggle} />
      </div>

      <br></br>
      <br></br>

      <h2><center><u>Total Roasts Till Now</u>: <b> {totalRoasts}</b> 🔥</center></h2>
      <br/>
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
    </div>
  );
};

export default App;
