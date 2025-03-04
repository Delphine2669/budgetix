// import Navbar from "./Navbar";
// import PropTypes from "prop-types";
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
    <header>
      <div>
        <div className="header">
          <img
            src={isDarkTheme ? darkLogo : lightLogo}
            alt="logo representant un billet"
            className="logo-budgetix"
          />
          <h1 className="title">Budget app</h1>
        </div>
        {/* <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />*/}
      </div>
    </header>
  );
}
// }
// Header.propTypes = {
//   isAuthenticated: PropTypes.bool,
//   handleLogout: PropTypes.func,
// };
export default Header;
