import React from 'react';
// import './DeleteModel.css'; // Uncomment if you have this CSS file

export default function DeleteModel({ isOpen, onClose, onConfirm, title, description }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Yes, Delete</button>
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
}
