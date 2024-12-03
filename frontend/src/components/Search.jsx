import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../Context/SearchProvider";
import "./search.css";

function Search() {
  const { searchResult, setSearchResult } = useContext(SearchContext);
  const [debouncedSearch, setDebouncedSearch] = useState(searchResult || "");
  const [debouncedSearchResult, setDebouncedSearchResult] =
    useState(searchResult);
  const navigate = useNavigate();

  // Debounce logic for updating searchResult
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchResult(debouncedSearch);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [debouncedSearch, setSearchResult]);

  useEffect(() => {
    if (searchResult !== undefined) {
      localStorage.setItem("searchResult", searchResult);
    }
  }, [searchResult]);

  // Navigation logic based on searchResult
  useEffect(() => {
    if (searchResult && searchResult.trim().length > 0) {
      navigate("/search");
    } else {
      navigate("/");
    }
  }, [searchResult, navigate]);

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        value={debouncedSearch}
        onChange={(e) => setDebouncedSearch(e.target.value)}
      />
      <ion-icon name="search-outline" />
    </div>
  );
}

export default Search;
