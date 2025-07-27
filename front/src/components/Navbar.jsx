import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleAuthChange = () => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    setIsAuthenticated(!!token);
    setUsername(storedUsername || "");
  };

  useEffect(() => {
    handleAuthChange();

    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
    navigate("/");
    window.dispatchEvent(new Event("authChanged"));
  };

  return (
    <nav>
      <ul>
        <div className="nav-container">
          {isAuthenticated ? (
            <div>
              <span>{username}</span>
              <li>
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Link to="/login" className="login-header-link">
                  Login
                </Link>
              </li>
              {/* <li>
                <Link to="/register" className="register-header-link">
                  Register
                </Link>
              </li> */}
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
