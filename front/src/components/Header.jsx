import Navbar from "./Navbar";
import PropTypes from "prop-types";
import logo from "../assets/logo.svg";
function Header({ isAuthenticated, handleLogout }) {
  return (
    <header>
      <div>
        <div className="header">
          <img
            src={logo}
            alt="logo representant un billet"
            className="logo-budgetix"
          />
          <h1 className="title">Budget app</h1>
        </div>
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      </div>
    </header>
  );
}
Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  handleLogout: PropTypes.func,
};
export default Header;
