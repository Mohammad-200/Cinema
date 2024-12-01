import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./SearchResultContainer.css";
import { SearchContext } from "../Context/SearchProvider";
import axios from "axios";
import { BarLoader } from "react-spinners";
import Cart from "../components/Cart";

const apiKey = process.env.REACT_APP_API_KEY;

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

      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchResult}&language=en-US&page=${page}`
        )
        .then((response) => {
          if (page === 1) {
            setMovies(response.data.results);
          } else {
            setMovies((previousMovies) => [
              ...previousMovies,
              ...response.data.results,
            ]);
          }
        })
        .catch((err) => {
          setError("An error occurred while fetching data");
        })
        .finally(() => {
          setLoading(false);
        });
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
        {/* {loading && ( --> spinner code
          <div className="spinner-overlay">
            <BarLoader color={"#36D7B7"} />
          </div>
        )} */}
        {error && <div className="error-message">{error}</div>}
      </div>
      <div ref={lastMovieElementRef} style={{ height: "1px" }} />
    </div>
  );
}

export default SearchResultContainer;
