import React, { useRef, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
function Register() {
  const [loading, setLoading] = useState(false);
  const username = useRef("");
  const email = useRef("");
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
        email: email.current.value,
        password: password.current.value,
      };
      setLoading(true);
      fetch("https://auth-rg69.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message == "User registered successfully!") {
            navigate("/login");
          }
          if (data.message == "Failed! Email is already in use!") {
            alert(data.message);
            email.current.focus();
          }
          if (data.message == "Failed! Username is already in use!") {
            alert(data.message);
            username.current.focus();
          }
          username.current.value == "";
          email.current.value == "";
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
      <h1 className="text-center fs-4 mt-5">Register Page</h1>
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
          type="email"
          className="form-control"
          placeholder="Enter email"
          ref={email}
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
          {loading ? "loading..." : "REGISTER"}
        </button>
        <NavLink to="/login">Login</NavLink>
      </form>
    </div>
  );
}

export default Register;
