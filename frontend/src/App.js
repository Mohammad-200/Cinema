import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "./App.css";
import Banner from "./pages/Banner";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AppToastContainer from "./components/AppToastContainer";
import SearchResultContainer from "./pages/SearchResultContainer";

function App() {
  const location = useLocation();
  const showHeader =
    location.pathname !== "/login" && location.pathname !== "/signup";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <AppToastContainer />
              <Main />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchResultContainer />} />
      </Routes>
    </>
  );
}

export default App;
