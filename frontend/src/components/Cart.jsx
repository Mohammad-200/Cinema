import React, { forwardRef, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./cart.css";
import { MdOutlineStar } from "react-icons/md";
import { IoMdAdd, IoMdPlay } from "react-icons/io";

const Cart = forwardRef(({ movie }, ref) => {
  const [trailerOn, setTrailerOn] = useState(false);

  const formattedRating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  useEffect(() => {
    if (trailerOn) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [trailerOn]);

  // Check if poster_path exists before rendering
  if (!movie.poster_path) return null;

  const playTrailer = (e) => {
    e.preventDefault();
    setTrailerOn(true);
  };

  const closeTrailer = () => {
    setTrailerOn(false);
  };

  return (
    <div ref={ref} className="col-lg-2 col-md-4 col-4">
      <div className="movie-cart">
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt="Preview Image"
          className="img-fluid"
        />
        <p>
          <MdOutlineStar className="react-star" /> {formattedRating}
        </p>
        <div className="content">
          <h4>{movie.title}</h4>
          <div className="card-icons">
            <IoMdAdd className="add" />
            <a href="#" onClick={playTrailer}>
              <IoMdPlay className="play" />
            </a>
          </div>
        </div>
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
    </div>
  );
});

export default Cart;
