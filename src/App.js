import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "./App.css";
import Banner from "./pages/Banner";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Signup from "./pages/Signup"; // Import your Signup component
import Login from "./pages/Login"; // Import your Login component if you have it

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Banner />
              <Main />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
