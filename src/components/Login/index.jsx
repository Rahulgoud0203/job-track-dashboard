import "./index.css";
import { Link, useNavigate, Navigate } from "react-router";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmitBtn = (event) => {
    event.preventDefault();

    if (!email.trim() && !password.trim()) {
      setErrorMsg("Email and Password are required");
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

    let userList = [];
    try {
      userList = JSON.parse(localStorage.getItem("Users")) || [];
    } catch {
      userList = [];
    }

    const user = userList.find((itm) => itm.email === email);

    if (!user) {
      setErrorMsg("Incorrect Email");
      return;
    }

    if (user.password !== password) {
      setErrorMsg("Incorrect Password");
      return;
    }

    Cookies.set("email_token", email);
    setErrorMsg("");
    navigate("/", { replace: true });
  };

  if (Cookies.get("email_token")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-main-container">
      <form className="login-card" onSubmit={onSubmitBtn}>
        <h1 className="login-heading">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <p className="error-msg">{errorMsg}</p>

        <button className="login-button">Login</button>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
