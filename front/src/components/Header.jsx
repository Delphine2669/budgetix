import Navbar from "./Navbar";
import PropTypes from "prop-types";
function Header({ isAuthenticated, handleLogout }) {
  return (
    <header>
      <div>
        <img />
        <h1 className="title">Budgetix</h1>
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
