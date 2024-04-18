import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
function Register() {
  const [loading, setLoading] = useState(false);
  const username = useRef("");
  const password = useRef("");
  const navigate = useNavigate();
  function validate() {
    return true;
  }
  function handleRegister(e) {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      const user = {
        username: username.current.value,
        password: password.current.value,
      };
      setLoading(true);
      fetch("https://auth-rg69.onrender.com/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/");
          }
          if (data.message == "User Not found.") {
            alert(data.message);
            username.current.focus();
          }
          if (data.message == "Invalid Password!") {
            alert(data.message);
            password.current.focus();
          }
          username.current.value == "";
          password.current.value == "";
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }
  return (
    <div>
      <h1 className="text-center fs-4 mt-5">Login Page</h1>
      <form
        className="w-50 mx-auto d-flex flex-column gap-4 mt-5"
        onSubmit={handleRegister}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Enter userName"
          ref={username}
        />

        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          ref={password}
        />
        <button
          disabled={loading ? true : false}
          className="btn btn-primary w-100"
        >
          {loading ? "loading..." : "LOGIN"}
        </button>
        <NavLink to="/register">Register</NavLink>
      </form>
    </div>
  );
}

export default Register;
