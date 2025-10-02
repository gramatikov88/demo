import React from "react";
import "./About.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const About = () => {
  return (
    <div className="about">
      <Header />
      <h1>About Us</h1>
      <p>This is the about page of our application.</p>
    </div>
  );
};

export default About;