import filterList from "../data/filterList";

import React from "react";
import "./schedule.css";
import Cart from "../components/Cart";

const apiKey = "dd7e06e21fb7d013bbbced7e171eac8e";

function Schedule() {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState(filterList);
  const [activeFilter, setActiveFilter] = React.useState("All");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        const moviesWithGenres = await Promise.all(
          data.results.map(async (movie) => {
            const movieResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`
            );
            const movieData = await movieResponse.json();
            return { ...movie, genres: movieData.genres };
          })
        );
        setMovies(moviesWithGenres);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterMovies = (category) => {
    setActiveFilter(category);
  };

  const getFilteredMovies = () => {
    if (activeFilter === "All") {
      return movies;
    }
    return movies.filter((movie) =>
      movie.genres.some((genre) => genre.name === activeFilter)
    );
  };

  return (
    <section className="schedule" id="schedule">
      <div className="container-fluid">
        <div className="row">
          <h2 className="section-title">opening this week</h2>
        </div>
        <div className="row">
          <ul className="filters">
            {filters.map((filter) => (
              <li
                key={filter._id}
                className={`${filter.name === activeFilter ? "active" : ""}`}
                onClick={() => filterMovies(filter.name)}
              >
                {filter.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="row mt-5">
          {loading ? (
            <p>Loading...</p>
          ) : (
            getFilteredMovies().map((movie) => (
              <Cart key={movie.id} movie={movie} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Schedule;
