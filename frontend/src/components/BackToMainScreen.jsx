import React from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import "./backToMainScreen.css";

function BackToMainScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="back-to-main-screen"
      onClick={() => navigate("/Cinema")}
      title="Go Back to the Main screen"
    >
      <TiArrowBackOutline className="back-icon" />
      <span className="back-text">Back to Cinema</span>
    </div>
  );
}

export default BackToMainScreen;
