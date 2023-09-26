import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./Header.css";
function Navbar({ isAuthenticated, handleLogout }) {
  return (
    <div>
      <nav>
        <ul>
          <div className="nav-container">
            <li>
              <NavLink to="/" className="nav-home-link">
                Home
              </NavLink>
            </li>
            {isAuthenticated ? (
              <li>
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <NavLink to="/login" className="nav-login-link">
                  Login
                </NavLink>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  handleLogout: PropTypes.func,
};
export default Navbar;
