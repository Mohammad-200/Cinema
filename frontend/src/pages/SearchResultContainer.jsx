import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./SearchResultContainer.css";
import axios from "axios";
import { SearchContext } from "../Context/SearchProvider";

import { BarLoader } from "react-spinners";
import Cart from "../components/Cart";
import { fetchMovieDetails } from "../utils/api";

function SearchResultContainer() {
  const { searchResult } = useContext(SearchContext);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observer = useRef();

  useEffect(() => {
    if (searchResult && searchResult.length > 0) {
      setLoading(true);
      setError(null);

      const fetchMoviesWithTrailers = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchResult}&language=en-US&page=${page}`
          );

          const movieDetailsPromises = response.data.results.map((movie) =>
            fetchMovieDetails(movie.id)
          );

          const moviesWithDetails = await Promise.all(movieDetailsPromises);

          setMovies((prevMovies) =>
            page === 1
              ? moviesWithDetails
              : [...prevMovies, ...moviesWithDetails]
          );
        } catch (err) {
          setError("An error occurred while fetching data");
        } finally {
          setLoading(false);
        }
      };

      fetchMoviesWithTrailers();
    } else {
      setMovies([]);
    }
  }, [searchResult, page]);

  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="search-result-container">
      <div className="row mt-5">
        {movies.map((movie, index) => {
          const uniqueKey = `page2-${movie.id}-${index}`;
          if (movies.length === index + 1) {
            return (
              <Cart ref={lastMovieElementRef} key={uniqueKey} movie={movie} />
            );
          } else {
            return <Cart key={uniqueKey} movie={movie} />;
          }
        })}
        {error && <div className="error-message">{error}</div>}
      </div>
      <div ref={lastMovieElementRef} style={{ height: "1px" }} />
      {loading && (
        <div className="spinner-overlay">
          <BarLoader color={"#36D7B7"} />
        </div>
      )}
    </div>
  );
}

export default SearchResultContainer;
