import "./index.css";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("email") !== null) {
      navigate("/", { replace: true });
    }
  }, []);

  const onEmail = (event) => {
    setEmail(event.target.value);
  };

  const onPassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitBtn = (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      if (email === "" && password === "") {
        seterrorMsg("Email and Password are Required");
      } else if (email === "") {
        seterrorMsg("Email is Required");
      } else {
        seterrorMsg("Password is Required");
      }
      return;
    }

    let userList = JSON.parse(localStorage.getItem("Users")) || [];

    const userdata = userList.find((itm) => itm.email === email);

    if (!userdata) {
      seterrorMsg("Incorrect Email");
      return;
    }

    if (userdata.password !== password) {
      seterrorMsg("Incorrect Password");
      return;
    }

    localStorage.setItem("email", JSON.stringify(email));
    seterrorMsg("");
    navigate("/", { replace: true });
  };

  return (
    <div className="login-main-container">
      <form className="login-card" onSubmit={onSubmitBtn}>
        <h1 className="login-heading">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          onChange={onEmail}
          value={email}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={onPassword}
          value={password}
        />

        <p className="error-msg">{errorMsg}</p>

        <button className="login-button">Login</button>

        <p className="register-text">
          Don't have an account?
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
