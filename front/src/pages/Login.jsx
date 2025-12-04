import toastr from "toastr";
import PropTypes from "prop-types";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-center",
  preventDuplicates: false,
  onclick: null,
  showDuration: "200",
  hideDuration: "500",
  timeOut: "3000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { username, password };
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      // const data = await res.json();
      if (res.ok) {
        const data = await res.json();
        console.log("login date:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("username", data.user.username);
        toastr.success("Successfully logged in");
        setIsAuthenticated(true);
        navigate("/account");
        window.dispatchEvent(new Event("authChanged"));
      } else {
        const errorMessage = await res.text();
        toastr.error(`Failed to login: ${errorMessage}`);
        console.error(`Login failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <NavLink to="/register">No account yet? Sign up here</NavLink>
      </div>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            required
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={handlePasswordChange}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};
Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};
export default Login;
