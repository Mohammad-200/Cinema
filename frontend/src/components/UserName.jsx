import React, { useState } from "react";
import Modal from "react-modal";
import "./userName.css";

// Ensure to set the app element for accessibility
Modal.setAppElement("#root");

function UserName({ user, logout }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeModal();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="user-name-container">
      <h2 className="user-name" onClick={openModal}>
        {user.userName}
      </h2>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Logout"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className="modal-buttons">
          <button onClick={handleLogout}>Yes</button>
          <button onClick={closeModal}>No</button>
        </div>
      </Modal>
    </div>
  );
}

export default UserName;
