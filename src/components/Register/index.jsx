import "./index.css";
import { Link, Navigate, useNavigate } from "react-router";
import { useState } from "react";
import Cookies from "js-cookie";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  if (Cookies.get("email_token")) {
    return <Navigate to="/" />;
  }

  const onSubmitForm = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setErrorMsg("Name is required");
      return;
    }
    if (!email.trim()) {
      setErrorMsg("Email is required");
      return;
    }
    if (!password.trim()) {
      setErrorMsg("Password is required");
      return;
    }
    if (!confirmPassword.trim()) {
      setErrorMsg("Confirm Password is required");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    let usersList = JSON.parse(localStorage.getItem("Users")) || [];

    const existingUser = usersList.find((user) => user.email === email);

    if (existingUser) {
      setErrorMsg("User already exists");
      return;
    }

    const newUser = { name, email, password };

    localStorage.setItem("Users", JSON.stringify([...usersList, newUser]));

    setErrorMsg("Registered successfully!");

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="register-main-container">
      <form className="register-card" onSubmit={onSubmitForm}>
        <h1 className="register-heading">Register</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="register-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="register-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <p className="error-msg">{errorMsg}</p>

        <button type="submit" className="register-button">
          Register
        </button>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
