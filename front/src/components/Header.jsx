// import Navbar from "./Navbar";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
import lightLogo from "../assets/logoLight.svg";
import darkLogo from "../assets/logoD.png";
import Navbar from "./Navbar";

export default function Header() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    const prefersDarkTheme = window.matchMedia(
      "(prefers-color-scheme:dark)"
    ).matches;

    setIsDarkTheme(prefersDarkTheme);
  }, []);

  return (
    <div className="header">
      <Link to="/">
        <img
          src={isDarkTheme ? darkLogo : lightLogo}
          alt="logo representant un billet"
          className="logo-budgetix"
        />
      </Link>
      <h1 className="title">Budget app</h1>
      <Navbar />
    </div>
  );
}
