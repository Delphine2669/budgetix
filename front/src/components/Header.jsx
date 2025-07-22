// import Navbar from "./Navbar";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
import lightLogo from "../assets/logoLight.svg";
import darkLogo from "../assets/logoD.png";

// function Header({ isAuthenticated, handleLogout }) {
function Header() {
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
      <div className="word-header">
        <h1 className="title">Budget app</h1>

        <Link to="/login" className="login-header-link">
          Login
        </Link>
        <Link to="/register" className="register-header-link">
          Register
        </Link>
      </div>
    </div>
  );
}
// }
Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  handleLogout: PropTypes.func,
};
export default Header;
