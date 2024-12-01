import React from "react";
import "./schedule.css";
import Cart from "../components/Cart";
import filterList from "../data/filterList";
import { fetchMovies, fetchMovieDetails } from "../utils/api";

function Schedule() {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState(filterList);
  const [activeFilter, setActiveFilter] = React.useState("All");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const moviesData = await fetchMovies();
        const moviesWithTrailers = await Promise.all(
          moviesData.results.map(async (movie) => {
            const movieData = await fetchMovieDetails(movie.id);
            return {
              ...movie,
              genres: movieData.genres,
              trailer: movieData.trailer,
            };
          })
        );
        setMovies(moviesWithTrailers);
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
            getFilteredMovies().map((movie, index) => {
              const uniqueKey = `page1-${movie.id}-${index}`;
              return <Cart key={uniqueKey} movie={movie} />;
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default Schedule;
