import { NavLink } from "react-router-dom";
import "./Header.css";
function Navbar() {
  return (
    <div className="nav-container">
      <NavLink to="/" className="nav-home-link">
        Home
      </NavLink>
      <NavLink to="/login" className="nav-login-link">
        Login
      </NavLink>
    </div>
  );
}
export default Navbar;
