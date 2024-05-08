import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "./App.css";
import Banner from "./pages/Banner";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AppToastContainer from "./components/AppToastContainer";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Banner />
            <AppToastContainer />
            <Main />
          </>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
