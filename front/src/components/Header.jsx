// import Navbar from "./Navbar";
// import PropTypes from "prop-types";
import "./Header.css";
import lightLogo from "../assets/logoLight.svg";
// function Header({ isAuthenticated, handleLogout }) {
function Header() {
  return (
    <header>
      <div>
        <div className="header">
          <img
            src={lightLogo}
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
