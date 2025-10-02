import React, { useState } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Calc from "./pages/Calc";

const About = () => <h2>About Page</h2>;

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/Home" element={<h1>Welcome to the App</h1>} />
          <Route path="/About" element={<About />} />
          <Route path="/Calc" element={<Calc />} />
          <Route path="/Login" element={<Login setUser={setUser} />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
};

export default App;