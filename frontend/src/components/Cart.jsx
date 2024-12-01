import React, { useState, forwardRef } from "react";
import { IoMdClose } from "react-icons/io";
import "./cart.css";

const Cart = forwardRef(({ movie }, ref) => {
  const [trailerOn, setTrailerOn] = useState(false);

  const formattedRating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

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
          <ion-icon name="star"></ion-icon> {formattedRating}
        </p>
        <div className="content">
          <h4>{movie.title}</h4>
          <div className="card-icons">
            <ion-icon name="add"></ion-icon>
            <a href="#" onClick={playTrailer}>
              <ion-icon name="play"></ion-icon>
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
