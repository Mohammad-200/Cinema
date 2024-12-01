import React, { useState } from "react";
import Modal from "react-modal";
import "./userName.css";

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
        <h2 className="modal-title">Confirm Logout</h2>
        <p className="modal-message">Are you sure you want to logout?</p>
        <div className="modal-buttons">
          <button
            className="modal-button modal-button-yes"
            onClick={handleLogout}
          >
            Yes
          </button>
          <button className="modal-button modal-button-no" onClick={closeModal}>
            No
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default UserName;
