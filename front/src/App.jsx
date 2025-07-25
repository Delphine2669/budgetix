import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Connected from "./pages/Connected";
import Register from "./pages/Register";
import Header from "./components/Header";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  // const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };
  // const handleLogout = (event) => {
  //   event.preventDefault();
  //   sessionStorage.removeItem("userToken");
  //   setIsAuthenticated(false);

  // navigate("/");
  // };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* // isAuthenticated={isAuthenticated}
            // handleLogout={handleLogout}
           */}
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route path="/account" element={<Connected />} />
      </Routes>
    </>
  );
}

export default App;
