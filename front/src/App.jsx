import "./App.css";
// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/register";
import Header from "./components/Header";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();

  // const handleLogout = (event) => {
  //   event.preventDefault();
  //   sessionStorage.removeItem("userToken");
  //   setIsAuthenticated(false);

  //   navigate("/");
  // };

  return (
    <>
      <Header />
      {/* <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} /> */}
      {/* <Routes>
        <Route path="/" element={<Home />} />
        {/* // isAuthenticated={isAuthenticated}
            // handleLogout={handleLogout}
           */}

      {/* <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        /> */}
      {/* </Routes> */}
      <Home />
    </>
  );
}

export default App;
