import React, { useState, useEffect, useContext } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../Context/SearchProvider";

function Search() {
  const { searchResult, setSearchResult } = useContext(SearchContext);
  const [hasNavigated, setHasNavigated] = useState(false);
  const navigate = useNavigate();

  // Loading the search input value from local storage
  useEffect(() => {
    const savedSearchResult = localStorage.getItem("searchResult");
    if (savedSearchResult) {
      setSearchResult(savedSearchResult);
    }
  }, [setSearchResult]);

  useEffect(() => {
    if (searchResult !== undefined) {
      localStorage.setItem("searchResult", searchResult);
    }
  }, [searchResult]);

  useEffect(() => {
    if (searchResult && searchResult.length > 0 && !hasNavigated) {
      navigate("/search");
      setHasNavigated(true);
    } else if ((!searchResult || searchResult.length === 0) && hasNavigated) {
      navigate("/");
      setHasNavigated(false);
    }
  }, [searchResult, navigate, hasNavigated]);

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        value={searchResult}
        onChange={(e) => setSearchResult(e.target.value)}
      />
      <ion-icon name="search-outline" />
    </div>
  );
}

export default Search;
