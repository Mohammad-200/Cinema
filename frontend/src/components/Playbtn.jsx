import React, { useState } from "react";
import { IoMdClose, IoMdPlay } from "react-icons/io";
import "./playBtn.css";

function Playbtn({ movie }) {
  const [trailerOn, setTrailerOn] = useState(false);

  const playTrailer = (e) => {
    e.preventDefault();
    setTrailerOn(true);
  };

  const closeTrailer = () => {
    setTrailerOn(false);
  };

  return (
    <>
      <div
        className={`trailer d-flex align-items-center justify-content-center ${
          movie.active ? "active" : ""
        }`}
      >
        <a href="#" onClick={playTrailer} className="playBtn">
          <IoMdPlay className="react-play" />
        </a>
        <p>Watch the trailer</p>
      </div>
      {trailerOn && (
        <div className="video-container">
          <div className="video-wrapper">
            <button className="closeBtn" onClick={closeTrailer}>
              <IoMdClose />
            </button>
            <iframe
              width="1200"
              height="720"
              src={movie.trailer}
              frameBorder="0"
              title={movie.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Playbtn;
