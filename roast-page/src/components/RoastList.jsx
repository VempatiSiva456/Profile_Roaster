import React from "react";
import RoastItem from "./RoastItem";
import "../App.css";

const RoastList = ({ roasts, onVote, onRoastClick }) => {
  return (
    <div className="roast-list">
      {roasts.map((roast) => (
        <RoastItem key={roast._id} roast={roast} onVote={onVote} onClick={() => onRoastClick(roast)} />
      ))}
    </div>
  );
};

export default RoastList;
