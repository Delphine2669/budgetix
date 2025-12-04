import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import "../components/budgetDashboard.css";
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

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const passwordRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&=_./-])[A-Za-z\d@$!%*?&=_./-]{16,}/;
  const passwordRequirementsMessage = (
    <p className="password-requirements-p">
      * Password must contain at least one uppercase letter, one lowercase
      letter, one digit, one special character, and be at least 16 characters
      long.
    </p>
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      username,
      hashedPassword: password,
      email,
    };

    if (!username) {
      toastr.info("please enter your username");
      return;
    }
    if (!email) {
      toastr.info("please enter your email");
      return;
    }
    if (!password) {
      toastr.info("please enter your password");
      return;
    }

    if (password !== passwordConfirmation) {
      toastr.info("Password and confirm password don't match.");
      return;
    }
    if (!passwordRegex.test(password)) {
      toastr.info(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 16 characters long."
      );
      return;
    }
    if (!username || !email || !password || !passwordConfirmation) {
      toastr.info("All field must be filled");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (res.ok) {
        setUsername("");
        setPassword("");
        setPasswordConfirmation("");
        setEmail("");
        navigate("/login");
      } else if (res.status === 409) {
        toastr.error("Account already exists");
      } else {
        toastr.error("Account creation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="page-register-name">Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            name="password"
            required
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={handleTogglePasswordVisibility}
          >
            {passwordVisible ? (
              <img
                src="/assets/hidePassword.png"
                alt="Hide Password"
                height="20"
                width="20"
              />
            ) : (
              <img
                src="/assets/showPassword.png"
                alt="Show Password"
                height="20"
                width="20"
              />
            )}
          </button>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            required
            name="passwordConfirmation"
            type={passwordVisible ? "text" : "password"}
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}
