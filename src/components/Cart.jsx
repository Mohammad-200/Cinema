import React from "react";
import "./cart.css";

function Cart({ movie }) {
  const formattedRating = movie.vote_average.toFixed(1);
  return (
    <div className="col-lg-2 col-md-4 col-sm-6">
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
            <ion-icon name="play"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
