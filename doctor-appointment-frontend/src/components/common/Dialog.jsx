import React from "react";

import "./Dialog.css";

export default function Dialog({ open, title, message, onClose }) {
  if (!open) return null;

  return (
    <div className="dialog-backdrop">
      <div className="dialog-box">
        <h3 className="dialog-title">{title}</h3>
        <p className="dialog-message">{message}</p>

        <button className="dialog-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
