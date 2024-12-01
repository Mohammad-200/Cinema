import React from "react";
import "./movieContent.css";

function MovieContent({ movie }) {
  const movieType = movie.genres.some(
    (m) => m.name === "Animation" || m.name === "Family" || m.name === "Comedy"
  )
    ? "Kids"
    : "adult";

  return (
    <div className={`content ${movie.active ? "active" : ""}`}>
      <h2>{movie.title}</h2>
      <h4>
        <span>{movie.release_date}</span>
        <span>
          <i>
            {Array.isArray(movie.genres) && movie.genres.length > 0
              ? movie.genres[0].name || String(movie.genres[0])
              : "No Genre"}
          </i>
        </span>
        <span>{movie.original_language}</span>
        <span>{movieType}</span>
      </h4>
      <p>{movie.overview}</p>
      <div className="button">
        {/* <Button
          icon={<ion-icon name="bookmark"></ion-icon>}
          name="Book"
          color="#ff3700"
          bgColor="#ffffff"
        />
        <Button icon={<ion-icon name="add"></ion-icon>} name="My List" /> */}
      </div>
    </div>
  );
}

export default MovieContent;
