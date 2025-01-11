import React, { useEffect, useState, useRef } from "react";
import "../App.css";

const Modal = ({ onClose, onYes }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Would you like to roast another profile?</h3>
        <div className="modal-buttons">
          <button onClick={onYes}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
