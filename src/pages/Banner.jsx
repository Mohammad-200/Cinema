import React, { useState, useEffect } from "react";
import MovieContent from "../components/MovieContent";
import MovieDate from "../components/MovieDate";
import Playbtn from "../components/Playbtn";
import MovieSwiper from "../components/MovieSwiper";
import "./banner.css";
import ChatControl from "../components/ChatControl";

const apiKey = process.env.REACT_APP_API_KEY;

function Banner() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      if (!response.ok) throw new Error("Failed to fetch movies.");
      const data = await response.json();

      if (data && data.results) {
        const moviesWithDetails = await Promise.all(
          data.results.map(async (movie) => {
            const detailsResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`
            );
            const details = await detailsResponse.json();
            const videosResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`
            );
            const videosData = await videosResponse.json();
            const trailer = videosData.results.find(
              (video) => video.type === "Trailer"
            );
            return {
              ...movie,
              genres: details.genres,
              active: false,
              trailer: trailer
                ? transformYouTubeUrl(
                    `https://www.youtube.com/watch?v=${trailer.key}`
                  )
                : null,
            };
          })
        );

        if (moviesWithDetails.length > 0) moviesWithDetails[0].active = true;

        setMovies(moviesWithDetails);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Transform the YouTube watch URL to an embed URL
  function transformYouTubeUrl(url) {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    } else {
      return null;
    }
  }

  const updateActiveMovie = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => ({
        ...movie,
        active: movie.id === id,
      }))
    );
  };

  return (
    <div className="banner">
      {movies && movies.length > 0 && !isLoading ? (
        movies.map((movie) => (
          <div className="movie" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt="Movie background"
              className={`bgImg ${movie.active ? "active" : ""}`}
            />
            <div className="container-fluid">
              <div className="row d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-6">
                  <MovieContent movie={movie} />
                </div>
                <div className="col-12 col-lg-6">
                  <MovieDate movie={movie} />
                  <Playbtn movie={movie} />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Data is loading...</p>
      )}
      {movies && movies.length > 0 && !isLoading ? (
        <MovieSwiper slides={movies} updateInfo={updateActiveMovie} />
      ) : (
        <p>Data is loading...</p>
      )}
      <ChatControl />
    </div>
  );
}

export default Banner;
