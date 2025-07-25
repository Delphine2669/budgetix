import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
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

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [matchingPassword, setMatchingPassword] = useState(true);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setPasswordConfirmation(e.target.value);
    setMatchingPassword(e.target.value === password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      username,
      hashedPassword: password,
      email,
    };

    try {
      const res = await fetch(
        `${
          import.meta.env.FORMER_VITE_BACKEND_URL ?? "http://localhost:5000"
        }/users`,
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
      <h2>Register</h2>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            required
            value={username}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            required
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            required
            type="password"
            value={passwordConfirmation}
            onChange={handleConfirmPasswordChange}
          />
          {!matchingPassword && <p className="error">Passwords do not match</p>}
        </div>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
