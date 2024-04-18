import { useState, useEffect, useContext } from "react";
import Details from "./pages/Details";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  function ProtectedRoute({ children }) {
    const isAuthenticated = token ? true : false;
    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, navigate]);
    return isAuthenticated ? children : null;
  }
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        {/* protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={token ? true : false}>
              <Home></Home>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/details"
          element={
            <ProtectedRoute isAuthenticated={token ? true : false}>
              <Details></Details>
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
